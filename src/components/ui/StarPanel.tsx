'use client'

import { useState } from 'react'
import { planets } from '../../data/planets'
import { PLANET_COLORS } from '../../utils/constants'

type Tab = 'music' | 'writing'

const tabs: { id: Tab; label: string }[] = [
  { id: 'music', label: 'Music' },
  { id: 'writing', label: 'Writing' },
]

const poem = `No deserto da mente, ela caminha,
Com passos leves, mas alma ferida.
Busca na fumaça a calma que aninha,
Um ouro falso que nunca é vida.

Risos e lembranças, breves respiros,
No reflexo da noite se engana.
Um coração que luta, que gira em suspiros,
Faz da dor seu abrigo, sua tara.

Paz de miragem, brilho enganoso,
Promessa de alívio que se desfaz.
Fogueira acesa no vento tempestuoso,
Um instante só — depois, só mais.

E mesmo que sorria em seu próprio lume,
A escuridão espera, paciente, nua.
O ouro é ilusão, e o coração assume:
A paz é fantasia — a dor continua.`

export function StarPanel() {
  const data = planets.find((p) => p.id === 'star')!
  const [activeTab, setActiveTab] = useState<Tab>('writing')

  const renderContent = () => {
    switch (activeTab) {
      case 'music':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">Romaria</h4>
                  <p className="text-white/40 text-sm">Original</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-white/40">
                  <span>1:23</span>
                  <span>4:12</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="text-white/60 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-white/30 text-sm text-center">More music coming soon...</p>
          </div>
        )
      case 'writing':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-xl font-medium text-white mb-4">Miragem de Paz</h4>
              <div className="space-y-3 text-white/70 font-serif leading-relaxed">
                {poem.split('\n\n').map((stanza, i) => (
                  <p key={i}>{stanza}</p>
                ))}
              </div>
            </div>
            <p className="text-white/30 text-sm text-center">More writings coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="pt-8 rounded-xl p-6 border border-white/10 bg-white/5" style={{ minHeight: '400px' }}>
      <h2 className="text-2xl font-bold text-white mb-2">
        {data.content.title}
      </h2>
      <p className="text-white/60 mb-6">{data.content.body}</p>
      
      <div className="flex gap-1 mb-6 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5" 
                style={{ background: `linear-gradient(90deg, ${PLANET_COLORS.star}, ${PLANET_COLORS.starGlow})` }}
              />
            )}
          </button>
        ))}
      </div>
      
      {renderContent()}
    </div>
  )
}
