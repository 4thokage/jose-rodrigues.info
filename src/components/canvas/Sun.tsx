'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { sunData } from '../../data/planets'

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[sunData.size, 32, 32]} />
        <meshStandardMaterial
          color={sunData.color}
          emissive={sunData.color}
          emissiveIntensity={2}
        />
      </mesh>
      <mesh ref={glowRef} scale={1.4}>
        <sphereGeometry args={[sunData.size, 32, 32]} />
        <meshBasicMaterial
          color="#FFD93D"
          transparent
          opacity={0.15}
        />
      </mesh>
      <pointLight color="#FFD93D" intensity={100} distance={50} />
      <Html
        position={[0, sunData.size + 1.5, 0]}
        center
        distanceFactor={15}
        style={{
          pointerEvents: 'none',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {sunData.name}
          </h1>
          <p className="text-sm text-white/60 mt-1">{sunData.tagline}</p>
        </div>
      </Html>
    </group>
  )
}
