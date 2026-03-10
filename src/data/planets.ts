import type { PlanetData } from '../types'
import { PLANET_COLORS } from '../utils/constants'

export const planets: PlanetData[] = [
  {
    id: 'about',
    name: 'About Me',
    color: PLANET_COLORS.about,
    orbitRadius: 6,
    orbitSpeed: 0.4,
    size: 0.8,
    content: {
      title: 'About Me',
      body: 'I am a full-stack developer passionate about building for the digital world',
      items: ['12+ years experience', 'Open source enthusiast', 'Creative problem solver'],
    },
  },
  {
    id: 'projects',
    name: 'Projects',
    color: PLANET_COLORS.projects,
    orbitRadius: 9,
    orbitSpeed: 0.25,
    size: 0.7,
    content: {
      title: 'Projects',
      body: 'A collection of my recent work and side projects.',
      items: ['Portfolio website', 'E-commerce platform', 'Real-time chat app'],
    },
  },
  {
    id: 'techStack',
    name: 'Tech Stack',
    color: PLANET_COLORS.techStack,
    orbitRadius: 12,
    orbitSpeed: 0.15,
    size: 1.0,
    content: {
      title: 'Tech Stack',
      body: 'Technologies I work with daily.',
      items: ['TypeScript', 'React', 'Node.js', 'Go', 'Java', 'PostgreSQL', 'Docker'],
    },
  },
  {
    id: 'contact',
    name: 'Contact',
    color: PLANET_COLORS.contact,
    orbitRadius: 15,
    orbitSpeed: 0.1,
    size: 0.65,
    content: {
      title: 'Get In Touch',
      body: 'Interested in working together? Lets connect!',
      items: ['Email: jsr@jose-rodrigues.info', 'GitHub: @4thokage'],
    },
  },
]

export const sunData = {
  name: 'José Rodrigues',
  tagline: 'Full-Stack Developer',
  color: '#FFD93D',
  size: 1.5,
}
