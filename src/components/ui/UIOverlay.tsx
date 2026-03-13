'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'
import { planets } from '../../data/planets'
import { AboutPanel } from './AboutPanel'
import { ProjectsPanel } from './ProjectsPanel'
import { TechStackPanel } from './TechStackPanel'
import { ContactPanel } from './ContactPanel'
import { StarPanel } from './StarPanel'
import { useIsMobile } from '../../hooks/useIsMobile'
import { zoomIn, zoomOut } from '../canvas/CameraRig'

const panelComponents = {
  about: AboutPanel,
  projects: ProjectsPanel,
  techStack: TechStackPanel,
  contact: ContactPanel,
  star: StarPanel,
}

export function UIOverlay() {
  const selectedPlanet = useStore((s) => s.selectedPlanet)
  const selectPlanet = useStore((s) => s.selectPlanet)
  const controlMode = useStore((s) => s.controlMode)
  const isPointerLocked = useStore((s) => s.isPointerLocked)

  const isMobile = useIsMobile()

  const handleClose = () => {
    selectPlanet(null)
    if (controlMode === 'ship' && !isPointerLocked) {
      setTimeout(() => {
        document.querySelector('canvas')?.requestPointerLock()
      }, 100)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const planetIds = planets.map((p) => p.id)
    const currentIndex = selectedPlanet ? planetIds.indexOf(selectedPlanet) : -1

    if (e.key === 'Escape') {
      selectPlanet(null)
      return
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % planetIds.length
      selectPlanet(planetIds[nextIndex])
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = currentIndex <= 0 ? planetIds.length - 1 : currentIndex - 1
      selectPlanet(planetIds[prevIndex])
    }
  }

  const PanelContent = selectedPlanet ? panelComponents[selectedPlanet as keyof typeof panelComponents] : null

  return (
    <>
      <div
        className="fixed bottom-4 left-4 text-xs text-white/40 z-10"
        aria-hidden="true"
      >
        Click planets to explore
      </div>
      {isMobile && controlMode === 'orbit' && (
        <div className="fixed bottom-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white text-lg"
            aria-label="Zoom out"
          >
            -
          </button>
          <button
            onClick={zoomIn}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white text-lg"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      )}
      <AnimatePresence>
        {selectedPlanet && PanelContent && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] p-6 z-10 pointer-events-none"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPlanet} panel`}
          >
            <div className="h-full pointer-events-auto">
              <div className="glass-panel h-full rounded-2xl p-6 overflow-y-auto">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close panel"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <div role="status" aria-live="polite">
                  <PanelContent />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
