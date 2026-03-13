'use client'

import { Sun } from './Sun'
import { Planet } from './Planet'
import { Star } from './Star'
import { OrbitRing } from './OrbitRing'
import { planets } from '../../data/planets'
import { PLANET_INITIAL_ANGLES } from '../../utils/constants'

export function SolarSystem() {
  const regularPlanets = planets.filter(p => p.id !== 'star')
  const starPlanet = planets.find(p => p.id === 'star')
  const starIndex = planets.findIndex(p => p.id === 'star')

  return (
    <group>
      <Sun />
      {regularPlanets.map((planet, index) => (
        <group key={planet.id}>
          <OrbitRing radius={planet.orbitRadius} />
          <Planet data={planet} initialAngle={PLANET_INITIAL_ANGLES[index] ?? 0} />
        </group>
      ))}
      {starPlanet && (
        <Star data={starPlanet} initialAngle={PLANET_INITIAL_ANGLES[starIndex] ?? 0} />
      )}
    </group>
  )
}
