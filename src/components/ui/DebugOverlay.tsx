'use client'

import { useStore } from '../../store/useStore'
import { planets } from '../../data/planets'

export function DebugOverlay() {
  const controlMode = useStore((s) => s.controlMode)
  const nearestPlanetId = useStore((s) => s.nearestPlanetId)
  const distanceToSurface = useStore((s) => s.distanceToSurface)
  const facedPlanetId = useStore((s) => s.facedPlanetId)
  const canLand = useStore((s) => s.canLand)
  const acceleration = useStore((s) => s.acceleration)

  if (controlMode !== 'ship') return null

  const nearestPlanet = nearestPlanetId ? planets.find(p => p.id === nearestPlanetId) : null
  const facedPlanet = facedPlanetId ? planets.find(p => p.id === facedPlanetId) : null

  return (
    <>
      {/* Crosshair */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
        <div className="relative">
          <div className="w-2 h-2 bg-white/60 rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-white/30 rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-white/20 -translate-y-3" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-white/20 -translate-x-3" />
        </div>
      </div>

      {/* Debug Panel */}
      <div className="fixed top-4 right-4 z-30 pointer-events-none">
        <div className="glass-panel px-4 py-3 rounded-lg text-xs space-y-1">
          <div className="text-white/40 uppercase tracking-wider mb-2">Debug Info</div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">Nearest:</span>
            <span className="text-white">{nearestPlanet?.name || 'None'}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">Distance:</span>
            <span className="text-white">{distanceToSurface.toFixed(1)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">Faced:</span>
            <span className={facedPlanet ? 'text-green-400' : 'text-white/30'}>
              {facedPlanet?.name || 'None'}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">Accel:</span>
            <span className="text-white">{acceleration}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/50">Can Land:</span>
            <span className={canLand ? 'text-yellow-400' : 'text-white/30'}>
              {canLand ? 'YES (Press E)' : 'NO'}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
