import { Scene } from '@/components/canvas/Scene'
import { UIOverlay } from '@/components/ui/UIOverlay'
import { ModeToggle } from '@/components/ui/ModeToggle'
import { LandingPrompt } from '@/components/ui/LandingPrompt'
import { MobileControls } from '@/components/ui/MobileControls'

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <Scene />
      <ModeToggle />
      <LandingPrompt />
      <MobileControls />
      <UIOverlay />
    </main>
  )
}
