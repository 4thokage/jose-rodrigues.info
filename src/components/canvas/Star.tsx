'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { PlanetData } from '../../types'
import { ANIMATION, PLANET_COLORS } from '../../utils/constants'
import { useStore } from '../../store/useStore'

interface StarProps {
  data: PlanetData
  initialAngle: number
}

export function Star({ data, initialAngle }: StarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const outerGlowRef = useRef<THREE.Mesh>(null)
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
    
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.02
      coreRef.current.rotation.x += 0.01
    }

    if (glowRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.15 + 1
      glowRef.current.scale.setScalar(pulse)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1
    }

    if (outerGlowRef.current) {
      const outerPulse = Math.sin(clock.getElapsedTime() * 1.5) * 0.2 + 1.3
      outerGlowRef.current.scale.setScalar(outerPulse)
      const mat = outerGlowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + Math.sin(clock.getElapsedTime() * 1.8) * 0.08
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
        ref={coreRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={PLANET_COLORS.star}
          emissive={PLANET_COLORS.starGlow}
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshBasicMaterial
          color={PLANET_COLORS.starGlow}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      
      <mesh ref={outerGlowRef} scale={2.5}>
        <sphereGeometry args={[data.size, 16, 16]} />
        <meshBasicMaterial
          color={PLANET_COLORS.star}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight
        color={PLANET_COLORS.starGlow}
        intensity={20}
        distance={15}
      />

      {isSelected && (
        <mesh scale={2}>
          <sphereGeometry args={[data.size, 16, 16]} />
          <meshBasicMaterial
            color={PLANET_COLORS.starGlow}
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      <Html
        position={[0, data.size + 0.8, 0]}
        center
        distanceFactor={15}
        style={{
          opacity: hovered || isSelected ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div 
          className="px-3 py-1.5 rounded text-sm text-white whitespace-nowrap"
          style={{ 
            backgroundColor: `${PLANET_COLORS.star}90`,
            boxShadow: `0 0 10px ${PLANET_COLORS.starGlow}80`
          }}
        >
          {data.name}
        </div>
      </Html>
    </group>
  )
}
