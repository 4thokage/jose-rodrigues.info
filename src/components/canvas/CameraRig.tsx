'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { damp3 } from 'maath/easing'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'
import { CAMERA, ANIMATION } from '../../utils/constants'
import { planets } from '../../data/planets'

export function CameraRig() {
  const { camera } = useThree()
  const selectedPlanet = useStore((s) => s.selectedPlanet)

  const targetPosition = useRef(new THREE.Vector3(...CAMERA.defaultPosition))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (selectedPlanet) {
      const planet = planets.find((p) => p.id === selectedPlanet)
      if (planet) {
        const angle = Date.now() * 0.001 * planet.orbitSpeed * ANIMATION.orbitSpeedMultiplier
        const px = Math.cos(angle) * planet.orbitRadius
        const pz = Math.sin(angle) * planet.orbitRadius

        targetPosition.current.set(px, 2, pz + 5)
        targetLookAt.current.set(px, 0, pz)
      }
    } else {
      targetPosition.current.set(...CAMERA.defaultPosition)
      targetLookAt.current.set(0, 0, 0)
    }

    damp3(camera.position, targetPosition.current, ANIMATION.cameraDamping, 1)
    
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(10).add(camera.position)
    
    damp3(currentLookAt, targetLookAt.current, ANIMATION.cameraDamping, 1)
    camera.lookAt(targetLookAt.current)
  })

  return null
}
