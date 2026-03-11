'use client'

import { useGitHubRepos } from '../../hooks/useGitHubRepos'

const GITHUB_USERNAME = '4thokage'

export function ProjectsPanel() {
  const { repos, loading, error } = useGitHubRepos(GITHUB_USERNAME)

  if (loading) {
    return (
      <div className="pt-8">
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Projects
        </h2>
        <p className="text-white/70 mb-6">Loading repositories...</p>
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-8">
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Projects
        </h2>
        <p className="text-white/70 mb-6">Unable to load repositories.</p>
      </div>
    )
  }

  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        Projects
      </h2>
      <p className="text-white/70 mb-6">
        A collection of my recent work and open source contributions.
      </p>
      <ul className="space-y-3 max-h-[60vh] overflow-y-auto [-ms-overflow-style:none_] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {repos.map((repo) => (
          <li 
            key={repo.id}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{repo.name}</span>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                </div>
              </div>
              {repo.description && (
                <p className="text-white/60 text-sm mt-1 line-clamp-2">
                  {repo.description}
                </p>
              )}
              {repo.language && (
                <span className="text-white/40 text-xs mt-2 inline-block">
                  {repo.language}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
