'use client'

import { useStore } from '../../store/useStore'
import { planets } from '../../data/planets'

export function LandingPrompt() {
  const controlMode = useStore((s) => s.controlMode)
  const isPanelOpen = useStore((s) => s.isPanelOpen)
  const nearestPlanetId = useStore((s) => s.nearestPlanetId)
  const nearestPlanetDistance = useStore((s) => s.nearestPlanetDistance)
  const isPointerLocked = useStore((s) => s.isPointerLocked)

  if (controlMode !== 'ship' || isPanelOpen) return null

  const nearestPlanet = planets.find(p => p.id === nearestPlanetId)
  const canLand = nearestPlanet && nearestPlanetDistance < 4

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
      {!isPointerLocked && (
        <p className="text-white/60 text-sm mb-2">Click to enable ship controls</p>
      )}
      {isPointerLocked && nearestPlanetId && nearestPlanet && (
        <div className="glass-panel px-4 py-2 rounded-lg">
          {canLand ? (
            <p className="text-white text-sm">
              Press <span className="font-bold text-yellow-400">E</span> to land on{' '}
              <span className="font-bold">{nearestPlanet.name}</span>
            </p>
          ) : (
            <p className="text-white/60 text-sm">
              Fly closer to {nearestPlanet.name} to land
            </p>
          )}
        </div>
      )}
      {isPointerLocked && (
        <p className="text-white/40 text-xs mt-2">
          WASD to move • Space/Shift for up/down • ESC to exit
        </p>
      )}
    </div>
  )
}
