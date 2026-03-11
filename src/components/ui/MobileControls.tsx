'use client'

import { useStore } from '../../store/useStore'
import { useIsMobile } from '../../hooks/useIsMobile'

export function MobileControls() {
  const controlMode = useStore((s) => s.controlMode)
  const isPanelOpen = useStore((s) => s.isPanelOpen)
  const acceleration = useStore((s) => s.acceleration)
  const setAcceleration = useStore((s) => s.setAcceleration)

  const isMobile = useIsMobile()

  if (!isMobile || controlMode !== 'ship' || isPanelOpen) return null

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-64">
      <div className="glass-panel rounded-xl p-4">
        <label className="text-white/60 text-xs block mb-2 text-center">
          Acceleration: {acceleration}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={acceleration}
          onChange={(e) => setAcceleration(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400"
        />
        <p className="text-white/40 text-xs mt-2 text-center">
          Tilt device to steer
        </p>
      </div>
    </div>
  )
}
