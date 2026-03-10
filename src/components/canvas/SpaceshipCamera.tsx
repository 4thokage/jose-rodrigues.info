'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'
import { planets } from '../../data/planets'

const MOVE_SPEED = 8
const MOUSE_SENSITIVITY = 0.002
const LANDING_DISTANCE = 4

function getPlanetPosition(planetId: string) {
  const planet = planets.find(p => p.id === planetId)
  if (!planet) return null
  const angle = Date.now() * 0.001 * planet.orbitSpeed * 0.3
  return new THREE.Vector3(
    Math.cos(angle) * planet.orbitRadius,
    0,
    Math.sin(angle) * planet.orbitRadius
  )
}

export function SpaceshipCamera() {
  const { camera, gl } = useThree()
  const controlMode = useStore((s) => s.controlMode)
  const isPanelOpen = useStore((s) => s.isPanelOpen)
  const isPointerLocked = useStore((s) => s.isPointerLocked)
  const selectPlanet = useStore((s) => s.selectPlanet)
  const setPointerLocked = useStore((s) => s.setPointerLocked)
  const setNearestPlanet = useStore((s) => s.setNearestPlanet)

  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const keys = useRef<Set<string>>(new Set())
  const nearestPlanet = useRef<string | null>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keys.current.add(e.code)

    if (e.code === 'KeyE') {
      if (isPanelOpen) {
        selectPlanet(null)
        setTimeout(() => {
          gl.domElement.requestPointerLock()
        }, 100)
      } else if (nearestPlanet.current) {
        const planetPos = getPlanetPosition(nearestPlanet.current)
        if (planetPos) {
          const distance = camera.position.distanceTo(planetPos)
          if (distance < LANDING_DISTANCE) {
            selectPlanet(nearestPlanet.current)
            document.exitPointerLock()
          }
        }
      }
    }
  }, [isPanelOpen, selectPlanet, camera, gl])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keys.current.delete(e.code)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isPointerLocked) return

    euler.current.setFromQuaternion(camera.quaternion)
    euler.current.y -= e.movementX * MOUSE_SENSITIVITY
    euler.current.x -= e.movementY * MOUSE_SENSITIVITY
    euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
    camera.quaternion.setFromEuler(euler.current)
  }, [camera, isPointerLocked])

  const handlePointerLockChange = useCallback(() => {
    const locked = document.pointerLockElement === gl.domElement
    setPointerLocked(locked)
  }, [gl, setPointerLocked])

  const handleClick = useCallback(() => {
    if (controlMode === 'ship' && !isPanelOpen && !isPointerLocked) {
      gl.domElement.requestPointerLock()
    }
  }, [controlMode, isPanelOpen, isPointerLocked, gl])

  useEffect(() => {
    if (controlMode !== 'ship') return

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    gl.domElement.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      gl.domElement.removeEventListener('click', handleClick)
    }
  }, [controlMode, handleKeyDown, handleKeyUp, handleMouseMove, handlePointerLockChange, handleClick, gl])

  useFrame((_, delta) => {
    if (controlMode !== 'ship') return

    const direction = new THREE.Vector3()
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)

    if (keys.current.has('KeyW')) direction.add(forward)
    if (keys.current.has('KeyS')) direction.sub(forward)
    if (keys.current.has('KeyA')) direction.sub(right)
    if (keys.current.has('KeyD')) direction.add(right)
    if (keys.current.has('Space')) direction.y += 1
    if (keys.current.has('ShiftLeft')) direction.y -= 1

    if (direction.length() > 0) {
      direction.normalize().multiplyScalar(MOVE_SPEED * delta)
      camera.position.add(direction)
    }

    let closestPlanetId: string | null = null
    let closestDistance = Infinity

    planets.forEach((planet) => {
      const angle = Date.now() * 0.001 * planet.orbitSpeed * 0.3
      const px = Math.cos(angle) * planet.orbitRadius
      const pz = Math.sin(angle) * planet.orbitRadius
      const planetPos = new THREE.Vector3(px, 0, pz)
      const distance = camera.position.distanceTo(planetPos)

      if (distance < closestDistance) {
        closestDistance = distance
        closestPlanetId = planet.id
      }
    })

    nearestPlanet.current = closestPlanetId

    setNearestPlanet(closestPlanetId, closestDistance)

    if (closestPlanetId && closestDistance < LANDING_DISTANCE && !isPanelOpen) {
      selectPlanet(closestPlanetId)
    }
  })

  return null
}
