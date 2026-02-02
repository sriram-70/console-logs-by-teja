'use client'

import { useEffect, useRef } from "react"
// gsap import is no longer needed, remove it
// import gsap from "gsap"

export function Atmosphere() {
    const layer1Ref = useRef<HTMLDivElement>(null) // Morning
    const layer2Ref = useRef<HTMLDivElement>(null) // Noon
    const layer3Ref = useRef<HTMLDivElement>(null) // Sunset

    useEffect(() => {
        let ticking = false

        const update = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            if (maxScroll <= 0) return

            const scrollY = window.scrollY
            const p = Math.max(0, Math.min(1, scrollY / maxScroll))

            // Logic:
            // 0.0 -> 0.5: Morph from Morning (1) to Noon (2)
            // 0.5 -> 1.0: Morph from Noon (2) to Sunset (3)

            let opacity1 = 0
            let opacity2 = 0
            let opacity3 = 0

            if (p < 0.5) {
                // First half: 0 to 0.5
                // Normalize p to 0-1 range for this section
                const localP = p * 2
                opacity1 = 1 - localP
                opacity2 = localP
                opacity3 = 0
            } else {
                // Second half: 0.5 to 1.0
                const localP = (p - 0.5) * 2
                opacity1 = 0
                opacity2 = 1 - localP
                opacity3 = localP
            }

            if (layer1Ref.current) layer1Ref.current.style.opacity = opacity1.toFixed(3)
            if (layer2Ref.current) layer2Ref.current.style.opacity = opacity2.toFixed(3)
            if (layer3Ref.current) layer3Ref.current.style.opacity = opacity3.toFixed(3)

            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update)
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        update() // Initial call

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            {/* 1. MORNING: Soft Pink/Lavender/Peach (Based on Image 1) */}
            <div
                ref={layer1Ref}
                className="absolute inset-0 transition-opacity duration-75 ease-linear will-change-[opacity]"
                style={{
                    background: 'linear-gradient(180deg, #E0C3FC 0%, #8EC5FC 100%)', // Lavender to Soft Blue
                    // Alternative (Warm): background: 'linear-gradient(to bottom, #FFDEE9, #B5FFFC)',
                }}
            />

            {/* 2. NOON: Vibrant Engineering Blue (Based on Image 2) */}
            <div
                ref={layer2Ref}
                className="absolute inset-0 transition-opacity duration-75 ease-linear will-change-[opacity]"
                style={{
                    background: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)', // Bright Blue/Cyan
                    opacity: 0
                }}
            />

            {/* 3. SUNSET: Golden Hour Orange/Red (Based on Image 3) */}
            <div
                ref={layer3Ref}
                className="absolute inset-0 transition-opacity duration-75 ease-linear will-change-[opacity]"
                style={{
                    background: 'linear-gradient(180deg, #fa709a 0%, #fee140 100%)', // Red to Yellow
                    // Alternative: background: 'linear-gradient(to bottom, #ff512f, #dd2476)',
                    opacity: 0
                }}
            />

            {/* Optional: Add a subtle noise overlay for texture if desired, matches "grain" requirement */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    )
}
