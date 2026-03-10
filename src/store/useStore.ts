import { create } from 'zustand'
import { Vector3 } from 'three'
import type { StoreState, ControlMode } from '../types'

export const useStore = create<StoreState>((set) => ({
  selectedPlanet: null,
  hoveredPlanet: null,
  isPanelOpen: false,
  cameraTarget: new Vector3(0, 0, 0),
  controlMode: 'orbit',
  isPointerLocked: false,
  nearestPlanetId: null,
  nearestPlanetDistance: Infinity,

  selectPlanet: (id: string | null) =>
    set({
      selectedPlanet: id,
      isPanelOpen: id !== null,
    }),

  setHoveredPlanet: (id: string | null) => set({ hoveredPlanet: id }),

  setCameraTarget: (target: Vector3) => set({ cameraTarget: target }),

  setControlMode: (mode: ControlMode) => set({ controlMode: mode }),

  setPointerLocked: (locked: boolean) => set({ isPointerLocked: locked }),

  setNearestPlanet: (id: string | null, distance: number) => 
    set({ nearestPlanetId: id, nearestPlanetDistance: distance }),
}))
