'use client'

import { useStore } from '../../store/useStore'
import { useIsMobile } from '../../hooks/useIsMobile'

export function ModeToggle() {
  const controlMode = useStore((s) => s.controlMode)
  const setControlMode = useStore((s) => s.setControlMode)
  const isPanelOpen = useStore((s) => s.isPanelOpen)

  const isMobile = useIsMobile()

  const handleShipMode = () => {
    if (!isPanelOpen) {
      setControlMode('ship')
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50 flex gap-2">
      <button
        onClick={() => setControlMode('orbit')}
        disabled={isPanelOpen}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          controlMode === 'orbit'
            ? 'bg-white/20 text-white'
            : 'bg-white/5 text-white/60 hover:bg-white/10'
        } ${isPanelOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Orbit View
      </button>
      <button
        onClick={handleShipMode}
        disabled={isPanelOpen}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          controlMode === 'ship'
            ? 'bg-white/20 text-white'
            : 'bg-white/5 text-white/60 hover:bg-white/10'
        } ${isPanelOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isMobile ? 'Touch Controls' : 'Ship Mode'}
      </button>
    </div>
  )
}
