'use client'

import { planets } from '../../data/planets'

export function AboutPanel() {
  const data = planets.find((p) => p.id === 'about')!

  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        {data.content.title}
      </h2>
      <p className="text-white/70 mb-6">{data.content.body}</p>
      <ul className="space-y-2">
        {data.content.items?.map((item, i) => (
          <li key={i} className="flex items-center text-white/60">
            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: data.color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
