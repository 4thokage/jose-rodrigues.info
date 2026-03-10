'use client'

import { planets } from '../../data/planets'

export function TechStackPanel() {
  const data = planets.find((p) => p.id === 'techStack')!

  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        {data.content.title}
      </h2>
      <p className="text-white/70 mb-6">{data.content.body}</p>
      <div className="flex flex-wrap gap-2">
        {data.content.items?.map((item, i) => (
          <span 
            key={i}
            className="px-3 py-1 rounded-full text-sm text-white"
            style={{ backgroundColor: `${data.color}40` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
