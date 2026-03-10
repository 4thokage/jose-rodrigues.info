import { Vector3 } from 'three'

export type ControlMode = 'orbit' | 'ship'

export interface PlanetData {
  id: string
  name: string
  color: string
  orbitRadius: number
  orbitSpeed: number
  size: number
  content: {
    title: string
    body: string
    items?: string[]
  }
}

export interface StoreState {
  selectedPlanet: string | null
  hoveredPlanet: string | null
  isPanelOpen: boolean
  cameraTarget: Vector3
  controlMode: ControlMode
  isPointerLocked: boolean
  nearestPlanetId: string | null
  nearestPlanetDistance: number
  selectPlanet: (id: string | null) => void
  setHoveredPlanet: (id: string | null) => void
  setCameraTarget: (target: Vector3) => void
  setControlMode: (mode: ControlMode) => void
  setPointerLocked: (locked: boolean) => void
  setNearestPlanet: (id: string | null, distance: number) => void
}
