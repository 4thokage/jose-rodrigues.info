'use client'

import { EffectComposer, Bloom } from '@react-three/postprocessing'

export function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        radius={0.8}
      />
    </EffectComposer>
  )
}
