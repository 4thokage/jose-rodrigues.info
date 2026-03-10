export const COLORS = {
  space: '#050510',
  sun: '#FFD93D',
  sunGlow: '#FF9500',
  orbit: 'rgba(255, 255, 255, 0.1)',
  text: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.6)',
} as const

export const PLANET_COLORS = {
  about: '#4A90D9',
  projects: '#D94A4A',
  techStack: '#D9A84A',
  contact: '#D9C74A',
} as const

export const CAMERA = {
  defaultPosition: [0, 8, 18] as [number, number, number],
  zoomedPosition: [0, 2, 6] as [number, number, number],
} as const

export const ANIMATION = {
  orbitSpeedMultiplier: 0.3,
  cameraDamping: 0.05,
} as const
