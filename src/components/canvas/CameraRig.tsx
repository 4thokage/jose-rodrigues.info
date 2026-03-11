'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { damp3 } from 'maath/easing'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'
import { CAMERA, ANIMATION } from '../../utils/constants'
import { planets } from '../../data/planets'

export const zoomIn = () => {
  const zoomLevel = useStore.getState().zoomLevel
  useStore.getState().setZoomLevel(Math.min(2, zoomLevel + 0.2))
}

export const zoomOut = () => {
  const zoomLevel = useStore.getState().zoomLevel
  useStore.getState().setZoomLevel(Math.max(0.3, zoomLevel - 0.2))
}

export function CameraRig() {
  const { camera } = useThree()
  const selectedPlanet = useStore((s) => s.selectedPlanet)
  const zoomLevel = useStore((s) => s.zoomLevel)

  const targetPosition = useRef(new THREE.Vector3(...CAMERA.defaultPosition))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * 0.01
      const currentZoom = useStore.getState().zoomLevel
      useStore.getState().setZoomLevel(Math.max(0.3, Math.min(2, currentZoom + delta)))
    }

    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  useFrame(() => {
    let basePos: THREE.Vector3

    if (selectedPlanet) {
      const planet = planets.find((p) => p.id === selectedPlanet)
      if (planet) {
        const angle = Date.now() * 0.001 * planet.orbitSpeed * ANIMATION.orbitSpeedMultiplier
        const px = Math.cos(angle) * planet.orbitRadius
        const pz = Math.sin(angle) * planet.orbitRadius

        basePos = new THREE.Vector3(px, 2, pz + 5)
        targetLookAt.current.set(px, 0, pz)
      } else {
        basePos = new THREE.Vector3(...CAMERA.defaultPosition)
        targetLookAt.current.set(0, 0, 0)
      }
    } else {
      basePos = new THREE.Vector3(0, 8, 18 * zoomLevel)
      targetLookAt.current.set(0, 0, 0)
    }

    targetPosition.current.copy(basePos)

    damp3(camera.position, targetPosition.current, ANIMATION.cameraDamping, 1)
    
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(10).add(camera.position)
    
    damp3(currentLookAt, targetLookAt.current, ANIMATION.cameraDamping, 1)
    camera.lookAt(targetLookAt.current)
  })

  return null
}
