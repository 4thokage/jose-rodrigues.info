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

  const getAccelLabel = () => {
    if (acceleration > 0) return `Forward ${acceleration}%`
    if (acceleration < 0) return `Reverse ${Math.abs(acceleration)}%`
    return 'Stopped'
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-72">
      <div className="glass-panel rounded-xl p-4">
        <label className="text-white/60 text-xs block mb-2 text-center">
          {getAccelLabel()}
        </label>
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-white/30" />
          <input
            type="range"
            min="-100"
            max="100"
            value={acceleration}
            onChange={(e) => setAcceleration(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400"
          />
        </div>
        <div className="flex justify-between text-white/40 text-xs mt-1">
          <span>Reverse</span>
          <span>Stop</span>
          <span>Forward</span>
        </div>
        <p className="text-white/40 text-xs mt-3 text-center">
          Tilt device to pitch & yaw
        </p>
      </div>
    </div>
  )
}
