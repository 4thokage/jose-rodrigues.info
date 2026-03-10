import { Vector3 } from 'three'

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
  selectPlanet: (id: string | null) => void
  setHoveredPlanet: (id: string | null) => void
  setCameraTarget: (target: Vector3) => void
}
