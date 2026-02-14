'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { Sun } from './Sun'



export function Scene({ footerState }: { footerState?: string }) {
    // Pass full state string to children for multi-stage logic (IDLE, CHARGING, CRITICAL)
    return (
        <div className="h-screen w-full relative">
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 5], fov: 35 }}
                dpr={[1, 1.5]} // Optimize for performance
            >
                <Suspense fallback={null}>
                    <Sun footerState={footerState} />

                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    )
}
