'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { PlanetData } from '../../types'
import { ANIMATION } from '../../utils/constants'
import { useStore } from '../../store/useStore'

interface PlanetProps {
  data: PlanetData
  initialAngle: number
}

export function Planet({ data, initialAngle }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const selectedPlanet = useStore((s) => s.selectedPlanet)
  const selectPlanet = useStore((s) => s.selectPlanet)
  const setHoveredPlanet = useStore((s) => s.setHoveredPlanet)

  const isSelected = selectedPlanet === data.id

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * ANIMATION.orbitSpeedMultiplier
      const angle = initialAngle + t * data.orbitSpeed
      groupRef.current.position.x = Math.cos(angle) * data.orbitRadius
      groupRef.current.position.z = Math.sin(angle) * data.orbitRadius
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  const handleClick = () => {
    selectPlanet(data.id)
  }

  const handlePointerOver = () => {
    setHovered(true)
    setHoveredPlanet(data.id)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    setHoveredPlanet(null)
    document.body.style.cursor = 'auto'
  }

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={isSelected ? 1.2 : hovered ? 1.1 : 1}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {isSelected && (
        <mesh scale={1.5}>
          <sphereGeometry args={[data.size, 16, 16]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      {hovered && !isSelected && (
        <Html
          position={[0, data.size + 0.5, 0]}
          center
          distanceFactor={12}
        >
          <div 
            className="px-3 py-1.5 rounded text-sm text-white whitespace-nowrap"
            style={{ backgroundColor: `${data.color}90` }}
          >
            {data.name}
          </div>
        </Html>
      )}
    </group>
  )
}
