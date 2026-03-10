'use client'

import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitRing } from './OrbitRing'
import { planets } from '../../data/planets'

export function SolarSystem() {
  const initialAngles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI]

  return (
    <group>
      <Sun />
      {planets.map((planet, index) => (
        <group key={planet.id}>
          <OrbitRing radius={planet.orbitRadius} />
          <Planet data={planet} initialAngle={initialAngles[index]} />
        </group>
      ))}
    </group>
  )
}
