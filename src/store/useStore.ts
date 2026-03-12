import { create } from 'zustand'
import type { StoreState, ControlMode } from '../types'

export const useStore = create<StoreState>((set) => ({
  selectedPlanet: null,
  hoveredPlanet: null,
  isPanelOpen: false,
  controlMode: 'orbit',
  isPointerLocked: false,
  nearestPlanetId: null,
  nearestPlanetDistance: Infinity,
  distanceToSurface: Infinity,
  facedPlanetId: null,
  canLand: false,
  isMobile: false,
  zoomLevel: 1,
  acceleration: 0,

  selectPlanet: (id: string | null) =>
    set({
      selectedPlanet: id,
      isPanelOpen: id !== null,
    }),

  setHoveredPlanet: (id: string | null) => set({ hoveredPlanet: id }),

  setControlMode: (mode: ControlMode) => set({ controlMode: mode }),

  setPointerLocked: (locked: boolean) => set({ isPointerLocked: locked }),

  setNearestPlanet: (id: string | null, distance: number) => 
    set({ nearestPlanetId: id, nearestPlanetDistance: distance }),

  setIsMobile: (mobile: boolean) => set({ isMobile: mobile }),

  setZoomLevel: (level: number) => set({ zoomLevel: level }),

  setAcceleration: (accel: number) => set({ acceleration: accel }),
}))
