'use client'

import { COLORS } from '../../utils/constants'

interface OrbitRingProps {
  radius: number
}

export function OrbitRing({ radius }: OrbitRingProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial
        color={COLORS.orbit}
        side={2}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}
