'use client'

import { planets } from '../../data/planets'

export function ProjectsPanel() {
  const data = planets.find((p) => p.id === 'projects')!

  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        {data.content.title}
      </h2>
      <p className="text-white/70 mb-6">{data.content.body}</p>
      <ul className="space-y-3">
        {data.content.items?.map((item, i) => (
          <li 
            key={i} 
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <span className="text-white">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
