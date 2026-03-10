'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 2000

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function Starfield() {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    const scales = new Float32Array(STAR_COUNT)

    for (let i = 0; i < STAR_COUNT; i++) {
      const seed = i * 1.618033988749895
      const radius = 50 + seededRandom(seed) * 100
      const theta = seededRandom(seed + 1) * Math.PI * 2
      const phi = Math.acos(2 * seededRandom(seed + 2) - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      scales[i] = seededRandom(seed + 3) * 0.5 + 0.1
    }

    return { positions, scales }
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.005
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, STAR_COUNT]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      <instancedBufferAttribute
        attach="geometry-attributes-position"
        args={[particles.positions, 3]}
      />
    </instancedMesh>
  )
}
