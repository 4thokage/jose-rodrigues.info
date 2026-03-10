'use client'

import { planets } from '../../data/planets'

export function ContactPanel() {
  const data = planets.find((p) => p.id === 'contact')!

  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        {data.content.title}
      </h2>
      <p className="text-white/70 mb-6">{data.content.body}</p>
      <ul className="space-y-3">
        {data.content.items?.map((item, i) => (
          <li key={i} className="text-white/60">
            {item}
          </li>
        ))}
      </ul>
      <button
        className="mt-6 px-6 py-3 rounded-lg text-white font-medium transition-colors hover:opacity-90"
        style={{ backgroundColor: data.color }}
      >
        Send Message
      </button>
    </div>
  )
}
