'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SolarSystem } from './SolarSystem'
import { Starfield } from './Starfield'
import { CameraRig } from './CameraRig'
import { SpaceshipCamera } from './SpaceshipCamera'
import { Effects } from './Effects'
import { COLORS } from '../../utils/constants'
import { useStore } from '../../store/useStore'

function CameraController() {
  const controlMode = useStore((s) => s.controlMode)

  if (controlMode === 'ship') {
    return <SpaceshipCamera />
  }

  return <CameraRig />
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 8, 18], fov: 50 }}
      dpr={[1, 2]}
      style={{ background: COLORS.space }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={[COLORS.space]} />
        <ambientLight intensity={0.1} />
        <Starfield />
        <SolarSystem />
        <CameraController />
        <Effects />
      </Suspense>
    </Canvas>
  )
}
