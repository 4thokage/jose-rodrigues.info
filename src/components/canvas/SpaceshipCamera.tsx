'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'
import { planets } from '../../data/planets'
import { ANIMATION, PLANET_INITIAL_ANGLES } from '../../utils/constants'

const MOVE_SPEED = 8
const MOUSE_SENSITIVITY = 0.002
const CAN_LAND_DISTANCE = 20

function getPlanetPosition(planetId: string, now: number) {
  const planetIndex = planets.findIndex((p) => p.id === planetId)
  if (planetIndex === -1) return null
  const planet = planets[planetIndex]
  const initialAngle = PLANET_INITIAL_ANGLES[planetIndex] ?? 0
  const angle = initialAngle + now * 0.001 * planet.orbitSpeed * ANIMATION.orbitSpeedMultiplier
  return new THREE.Vector3(
    Math.cos(angle) * planet.orbitRadius,
    0,
    Math.sin(angle) * planet.orbitRadius
  )
}

function checkSpaceContext(camera: THREE.Camera, raycaster: THREE.Raycaster, now: number) {
  let nearestPlanetId: string | null = null
  let distanceToSurface = Infinity

  planets.forEach((planet) => {
    const pos = getPlanetPosition(planet.id, now)
    if (!pos) return
    const distToCenter = camera.position.distanceTo(pos)
    const distToSurface = distToCenter - planet.size
    if (distToSurface < distanceToSurface) {
      distanceToSurface = distToSurface
      nearestPlanetId = planet.id
    }
  })

  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
  const ray = raycaster.ray

  let facedPlanetId: string | null = null
  let facedDistance = Infinity
  const hitPoint = new THREE.Vector3()

  for (const planet of planets) {
    const pos = getPlanetPosition(planet.id, now)
    if (!pos) continue

    const sphere = new THREE.Sphere(pos, planet.size)
    if (ray.intersectSphere(sphere, hitPoint)) {
      const t = camera.position.distanceTo(hitPoint)
      if (t < facedDistance) {
        facedDistance = t
        facedPlanetId = planet.id
      }
    }
  }

  const canLand = facedPlanetId !== null && 
                  nearestPlanetId !== null && 
                  facedPlanetId === nearestPlanetId && 
                  distanceToSurface < CAN_LAND_DISTANCE

  return {
    nearestPlanetId,
    distanceToSurface,
    facedPlanetId,
    canLand
  }
}

export function SpaceshipCamera() {
  const { camera, gl } = useThree()
  const controlMode = useStore((s) => s.controlMode)
  const isPanelOpen = useStore((s) => s.isPanelOpen)
  const isPointerLocked = useStore((s) => s.isPointerLocked)
  const selectPlanet = useStore((s) => s.selectPlanet)
  const setPointerLocked = useStore((s) => s.setPointerLocked)
  const acceleration = useStore((s) => s.acceleration)
  const setIsMobile = useStore((s) => s.setIsMobile)

  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const keys = useRef<Set<string>>(new Set())
  const raycaster = useRef(new THREE.Raycaster())
  const deviceOrientation = useRef({ alpha: 0, beta: 0, gamma: 0 })
  const hasAccelerometer = useRef(false)
  const lastUpdateRef = useRef(0)

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

    if (e.code === 'KeyE') {
      const canLand = useStore.getState().canLand
      
      if (isPanelOpen) {
        selectPlanet(null)
        if (controlMode === 'ship') {
          setTimeout(() => {
            gl.domElement.requestPointerLock()
          }, 100)
        }
      } else if (canLand) {
        const facedPlanetId = useStore.getState().facedPlanetId
        if (facedPlanetId) {
          selectPlanet(facedPlanetId)
        }
      }
    }
  }, [isPanelOpen, selectPlanet, controlMode, gl])

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
      const tiltPitch = THREE.MathUtils.clamp((beta - 45) / 45, -1, 1)
      const tiltYaw = THREE.MathUtils.clamp(gamma / 45, -1, 1)
      
      euler.current.setFromQuaternion(camera.quaternion)
      euler.current.x -= tiltPitch * delta * 0.5
      euler.current.y -= tiltYaw * delta * 0.5
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
      camera.quaternion.setFromEuler(euler.current)
    }

    const accelMultiplier = acceleration / 100

    if (direction.length() > 0) {
      direction.normalize().multiplyScalar(MOVE_SPEED * delta * (1 + Math.abs(accelMultiplier)))
      camera.position.add(direction)
    } else if (accelMultiplier !== 0) {
      const moveDir = forward.clone().multiplyScalar(accelMultiplier * MOVE_SPEED * delta)
      camera.position.add(moveDir)
    }

    if (Date.now() - lastUpdateRef.current > 50) {
      lastUpdateRef.current = Date.now()
      
      const spaceContext = checkSpaceContext(camera, raycaster.current, Date.now())
      
      useStore.setState({
        nearestPlanetId: spaceContext.nearestPlanetId,
        nearestPlanetDistance: spaceContext.distanceToSurface,
        distanceToSurface: spaceContext.distanceToSurface,
        facedPlanetId: spaceContext.facedPlanetId,
        canLand: spaceContext.canLand,
      })
    }
  })

  return null
}
