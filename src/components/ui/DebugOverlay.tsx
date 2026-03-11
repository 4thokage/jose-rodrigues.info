'use client'

import { useStore } from '../../store/useStore'

export function DebugOverlay() {
  const controlMode = useStore((s) => s.controlMode)

  if (controlMode !== 'ship') return null

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
      <div className="relative">
        <div className="w-2 h-2 bg-white/60 rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-white/30 rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-white/20 -translate-y-3" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-white/20 -translate-x-3" />
      </div>
    </div>
  )
}
