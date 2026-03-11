'use client'

import { useState } from 'react'
import { planets } from '../../data/planets'

type Tab = 'music' | 'videos' | 'writing'

const tabs: { id: Tab; label: string }[] = [
  { id: 'music', label: 'Music' },
  { id: 'videos', label: 'Videos' },
  { id: 'writing', label: 'Writing' },
]

export function CreativePanel() {
  const data = planets.find((p) => p.id === 'creative')!
  const [activeTab, setActiveTab] = useState<Tab>('music')

  const renderContent = () => {
    switch (activeTab) {
      case 'music':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Music</h3>
            <p className="text-white/60">My musical creations and productions.</p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white font-medium">Track Title 1</p>
                <p className="text-white/50 text-sm">Genre • Duration</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white font-medium">Track Title 2</p>
                <p className="text-white/50 text-sm">Genre • Duration</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white font-medium">Track Title 3</p>
                <p className="text-white/50 text-sm">Genre • Duration</p>
              </div>
            </div>
            <p className="text-white/40 text-sm italic">More music coming soon...</p>
          </div>
        )
      case 'videos':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Videos</h3>
            <p className="text-white/60">My video projects and recordings.</p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white font-medium">Video Title 1</p>
                <p className="text-white/50 text-sm">Category • Duration</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white font-medium">Video Title 2</p>
                <p className="text-white/50 text-sm">Category • Duration</p>
              </div>
            </div>
            <p className="text-white/40 text-sm italic">More videos coming soon...</p>
          </div>
        )
      case 'writing':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Writing</h3>
            <p className="text-white/60">Articles, stories, and other writings.</p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white font-medium">Article Title 1</p>
                <p className="text-white/50 text-sm">Category • Date</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white font-medium">Story Title 1</p>
                <p className="text-white/50 text-sm">Fiction • Date</p>
              </div>
            </div>
            <p className="text-white/40 text-sm italic">More writing coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        {data.content.title}
      </h2>
      <p className="text-white/70 mb-6">{data.content.body}</p>
      
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: data.color }}
              />
            )}
          </button>
        ))}
      </div>
      
      {renderContent()}
    </div>
  )
}
