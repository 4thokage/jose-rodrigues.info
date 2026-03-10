'use client'

import { useStore } from '../../store/useStore'

export function ModeToggle() {
  const controlMode = useStore((s) => s.controlMode)
  const setControlMode = useStore((s) => s.setControlMode)
  const isPanelOpen = useStore((s) => s.isPanelOpen)

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
        disabled
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white/5 text-white/20 cursor-not-allowed opacity-50"
        title="Coming soon"
      >
        Ship Mode
      </button>
    </div>
  )
}
