import { Scene } from '@/components/canvas/Scene'
import { UIOverlay } from '@/components/ui/UIOverlay'

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <Scene />
      <UIOverlay />
    </main>
  )
}
