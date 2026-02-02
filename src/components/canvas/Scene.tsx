'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { Sun } from './Sun'

export function Scene() {
    return (
        <div className="h-screen w-full relative">
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 5], fov: 35 }}
                dpr={[1, 1.5]} // Optimize for performance
            >
                <Suspense fallback={null}>
                    <Sun />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    )
}
