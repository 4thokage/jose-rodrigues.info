'use client'

import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitRing } from './OrbitRing'
import { planets } from '../../data/planets'
import { PLANET_INITIAL_ANGLES } from '../../utils/constants'

export function SolarSystem() {
  return (
    <group>
      <Sun />
      {planets.map((planet, index) => (
        <group key={planet.id}>
          <OrbitRing radius={planet.orbitRadius} />
          <Planet data={planet} initialAngle={PLANET_INITIAL_ANGLES[index] ?? 0} />
        </group>
      ))}
    </group>
  )
}
