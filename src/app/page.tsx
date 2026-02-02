import { Scene } from '@/components/canvas/Scene'
import { Overlay } from '@/components/dom/Overlay'
import { Atmosphere } from '@/components/dom/Atmosphere'

export default function Home() {
  return (
    <>
      <Atmosphere />
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>
      <div className="relative z-10">
        <Overlay />
      </div>
    </>
  )
}
