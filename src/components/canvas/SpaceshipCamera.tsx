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
  const { camera, gl, scene } = useThree()
  const controlMode = useStore((s) => s.controlMode)
  const isPanelOpen = useStore((s) => s.isPanelOpen)
  const isPointerLocked = useStore((s) => s.isPointerLocked)
  const selectPlanet = useStore((s) => s.selectPlanet)
  const setPointerLocked = useStore((s) => s.setPointerLocked)
  const setNearestPlanet = useStore((s) => s.setNearestPlanet)
  const acceleration = useStore((s) => s.acceleration)
  const setIsMobile = useStore((s) => s.setIsMobile)

  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const keys = useRef<Set<string>>(new Set())
  const raycaster = useRef(new THREE.Raycaster())
  const deviceOrientation = useRef({ alpha: 0, beta: 0, gamma: 0 })
  const hasAccelerometer = useRef(false)

  const detectMobile = useCallback(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmall = window.innerWidth <= 768
    setIsMobile(isTouch || isSmall)
  }, [setIsMobile])

  const requestAccelerometerPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
        if (permission === 'granted') {
          hasAccelerometer.current = true
        }
      } catch (e) {
        console.log('Accelerometer permission denied')
      }
    } else if ('DeviceOrientationEvent' in window) {
      hasAccelerometer.current = true
    }
  }, [])

  const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.alpha !== null) {
      deviceOrientation.current = {
        alpha: e.alpha || 0,
        beta: e.beta || 0,
        gamma: e.gamma || 0
      }
    }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keys.current.add(e.code)

    if (e.code === 'Escape') {
      if (isPanelOpen) {
        selectPlanet(null)
      }
    }

    if (e.code === 'KeyE') {
      if (isPanelOpen) {
        selectPlanet(null)
        setTimeout(() => {
          gl.domElement.requestPointerLock()
        }, 100)
      }
    }
  }, [isPanelOpen, selectPlanet, gl])

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

  const handleTouchStart = useCallback(() => {
    if (controlMode === 'ship' && !isPanelOpen && !hasAccelerometer.current) {
      requestAccelerometerPermission()
    }
  }, [controlMode, isPanelOpen, requestAccelerometerPermission])

  useEffect(() => {
    detectMobile()
    window.addEventListener('resize', detectMobile)
    return () => window.removeEventListener('resize', detectMobile)
  }, [detectMobile])

  useEffect(() => {
    if (controlMode !== 'ship') return

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    gl.domElement.addEventListener('click', handleClick)
    gl.domElement.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('deviceorientation', handleDeviceOrientation)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      gl.domElement.removeEventListener('click', handleClick)
      gl.domElement.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [controlMode, handleKeyDown, handleKeyUp, handleMouseMove, handlePointerLockChange, handleClick, handleTouchStart, handleDeviceOrientation, gl])

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

    if (hasAccelerometer.current) {
      const { beta, gamma } = deviceOrientation.current
      const tiltForward = THREE.MathUtils.clamp((beta - 45) / 45, -1, 1)
      const tiltRight = THREE.MathUtils.clamp(gamma / 45, -1, 1)
      
      direction.add(forward.clone().multiplyScalar(tiltForward * 0.5))
      direction.add(right.clone().multiplyScalar(tiltRight * 0.5))
    }

    const accelMultiplier = acceleration / 100

    if (direction.length() > 0) {
      direction.normalize().multiplyScalar(MOVE_SPEED * delta * (1 + accelMultiplier))
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

    setNearestPlanet(closestPlanetId, closestDistance)

    raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera)
    
    const planetMeshes: THREE.Object3D[] = []
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry instanceof THREE.SphereGeometry) {
        const pos = obj.position
        const distFromOrigin = Math.sqrt(pos.x * pos.x + pos.z * pos.z)
        if (distFromOrigin > 2 && distFromOrigin < 20) {
          planetMeshes.push(obj)
        }
      }
    })
    
    const intersects = raycaster.current.intersectObjects(planetMeshes, true)
    
    let facedPlanetId: string | null = null
    if (intersects.length > 0) {
      const hitPoint = intersects[0].point
      const hitDistFromOrigin = Math.sqrt(hitPoint.x * hitPoint.x + hitPoint.z * hitPoint.z)
      
      let closestMatch = Infinity
      let matchedPlanetId: string | null = null
      
      planets.forEach((planet) => {
        const angle = Date.now() * 0.001 * planet.orbitSpeed * 0.3
        const px = Math.cos(angle) * planet.orbitRadius
        const pz = Math.sin(angle) * planet.orbitRadius
        const planetPos = new THREE.Vector3(px, 0, pz)
        const distToHit = planetPos.distanceTo(hitPoint)
        
        if (distToHit < closestMatch) {
          closestMatch = distToHit
          matchedPlanetId = planet.id
        }
      })
      
      if (closestMatch < 3) {
        facedPlanetId = matchedPlanetId
      }
    }

    const currentSelectedPlanet = useStore.getState().selectedPlanet

    if (facedPlanetId && closestDistance < LANDING_DISTANCE && !isPanelOpen) {
      selectPlanet(facedPlanetId)
    }

    if (isPanelOpen && currentSelectedPlanet) {
      const currentPlanetPos = getPlanetPosition(currentSelectedPlanet)
      if (currentPlanetPos) {
        const distFromSelected = camera.position.distanceTo(currentPlanetPos)
        
        if (distFromSelected > LANDING_DISTANCE * 1.5) {
          selectPlanet(null)
        } else if (facedPlanetId && facedPlanetId !== currentSelectedPlanet && closestDistance < LANDING_DISTANCE) {
          selectPlanet(facedPlanetId)
        }
      }
    }
  })

  return null
}
