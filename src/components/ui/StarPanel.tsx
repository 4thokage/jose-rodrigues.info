'use client'

import { useState, useEffect } from 'react'
import { planets } from '../../data/planets'
import { PLANET_COLORS } from '../../utils/constants'

type Tab = 'videos' | 'music' | 'writing'

const tabs: { id: Tab; label: string }[] = [
  { id: 'videos', label: 'Videos' },
  { id: 'music', label: 'Music' },
  { id: 'writing', label: 'Writing' },
]

export function StarPanel() {
  const data = planets.find((p) => p.id === 'star')!
  const [activeTab, setActiveTab] = useState<Tab>('videos')

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes psychedelicPulse {
        0%, 100% { 
          border-color: ${PLANET_COLORS.star};
          box-shadow: 0 0 20px ${PLANET_COLORS.star}40, inset 0 0 30px ${PLANET_COLORS.star}20;
        }
        33% { 
          border-color: ${PLANET_COLORS.starGlow};
          box-shadow: 0 0 30px ${PLANET_COLORS.starGlow}50, inset 0 0 40px ${PLANET_COLORS.starGlow}30;
        }
        66% { 
          border-color: #ff00ff;
          box-shadow: 0 0 25px #ff00ff40, inset 0 0 35px #ff00ff20;
        }
      }
      @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      .star-panel {
        animation: psychedelicPulse 4s ease-in-out infinite;
        position: relative;
        overflow: hidden;
      }
      .star-panel::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.03) 2px,
          rgba(255,255,255,0.03) 4px
        );
        pointer-events: none;
        z-index: 1;
      }
      .star-panel::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(180deg, ${PLANET_COLORS.starGlow}00, ${PLANET_COLORS.starGlow}40, ${PLANET_COLORS.starGlow}00);
        animation: scanline 3s linear infinite;
        pointer-events: none;
        z-index: 2;
      }
      .star-tab.active::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, ${PLANET_COLORS.star}, ${PLANET_COLORS.starGlow}, #ff00ff, ${PLANET_COLORS.starGlow}, ${PLANET_COLORS.star});
        background-size: 200% 100%;
        animation: psychedelicGradient 2s linear infinite;
      }
      @keyframes psychedelicGradient {
        0% { background-position: 0% 0%; }
        100% { background-position: 200% 0%; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'videos':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Video Collection
            </h3>
            <p className="text-white/60">Visual journeys through space and time.</p>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="p-4 rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 hover:border-purple-400/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium group-hover:text-purple-300 transition-colors">
                        Video Title {i}
                      </p>
                      <p className="text-white/40 text-sm">Duration • Date</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-sm italic text-center py-4">More videos coming soon...</p>
          </div>
        )
      case 'music':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Sonic Universe
            </h3>
            <p className="text-white/60">Ambient soundscapes and electronic compositions.</p>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="p-3 rounded-lg bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-cyan-900/20 border border-pink-500/20 hover:border-pink-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 18V5l12-2v13"/>
                          <circle cx="6" cy="18" r="3"/>
                          <circle cx="18" cy="16" r="3"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium group-hover:text-pink-300 transition-colors">
                          Track {i}
                        </p>
                        <p className="text-white/40 text-xs">Genre • 0:00</p>
                      </div>
                    </div>
                    <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${30 + (i * 15)}%`,
                          background: `linear-gradient(90deg, ${PLANET_COLORS.star}, ${PLANET_COLORS.starGlow}, #ff00ff)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-sm italic text-center py-4">More tracks loading...</p>
          </div>
        )
      case 'writing':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Written Worlds
            </h3>
            <p className="text-white/60">Thoughts, stories, and cosmic essays.</p>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="p-4 rounded-lg bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 hover:border-cyan-400/60 transition-all cursor-pointer group"
                >
                  <p className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                    Article / Story Title {i}
                  </p>
                  <p className="text-white/50 text-sm mt-1 line-clamp-2">
                    A brief excerpt from this piece of writing that gives a glimpse into the content...
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      Category
                    </span>
                    <span className="text-white/30 text-xs">Date</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-sm italic text-center py-4">More writings incoming...</p>
          </div>
        )
    }
  }

  return (
    <div className="pt-8 star-panel rounded-xl p-6 border-2" style={{ minHeight: '400px' }}>
      <h2 
        className="text-3xl font-bold mb-2" 
        style={{ 
          fontFamily: 'Orbitron, sans-serif',
          background: `linear-gradient(90deg, ${PLANET_COLORS.star}, ${PLANET_COLORS.starGlow}, #ff00ff, ${PLANET_COLORS.starGlow})`,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {data.content.title}
      </h2>
      <p className="text-white/70 mb-6">{data.content.body}</p>
      
      <div className="flex gap-1 mb-6 border-b border-white/10 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`star-tab px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {renderContent()}
    </div>
  )
}
