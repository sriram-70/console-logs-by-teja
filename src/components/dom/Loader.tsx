'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

interface LoaderProps {
    onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(true)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setActive(false)
                onComplete()
            }
        })

        const line = lineRef.current
        const container = containerRef.current

        if (!line || !container) return

        // Ensure initial state
        gsap.set(line, {
            width: 4,
            height: 0,
            borderRadius: 2,
            background: 'linear-gradient(to bottom, #FF9A9E, #FECFEF, #00C9FF)', // Peach -> Cyan ish (Adjusted for "Solar" vibe if needed)
            // User requested: Peach -> Cyan -> Sunset Red
            backgroundImage: 'linear-gradient(180deg, #FFB88C 0%, #00C9FF 50%, #FF512F 100%)'
        })

        // Phase 1: The Spark (Elongate Up/Down)
        tl.to(line, {
            height: 120,
            duration: 0.8,
            ease: 'power3.inOut'
        })

        // Phase 2: The Spin (Rotate 180 & Widen to Disc)
        tl.to(line, {
            rotation: 180,
            width: 120,
            borderRadius: '50%', // It becomes a circle
            duration: 0.8,
            ease: 'back.out(1.7)'
        })

        // Phase 3: The Big Bang (Flood Screen)
        tl.to(line, {
            scale: 100, // Massive expansion
            duration: 0.8,
            ease: 'power4.in'
        })

        // Phase 4: The Reveal (Bounce Back)
        // We need to coordinate this. When it shrinks, it reveals the app. 
        // The background of the loader is black. We need the "Line/Ball" to be the mask or the object.
        // If the ball scales up and covers the screen, the user sees the ball's gradient.
        // Then the ball shrinks, revealing the... site?
        // Wait, if the ball is on top of black, and it shrinks, it reveals MORE black.
        // UNLESS the 'container' transparent?
        // User: "The screen-filling color bounces back... website is revealed from the corners first"
        // This implies the BALL creates the "hole" or the BALL is the cover? 
        // "The screen-filling color bounces back (shrinks) rapidly towards the center."
        // This means the Ball was covering the screen.
        // So: Black background. Ball expands to cover Black. Now screen is Gradient.
        // Ball shrinks. Now screen is... Black again? No, we want to reveal the site.
        // So the CONTAINER background (Black) must fade out as the Ball fills the screen?
        // Or the Ball IS the curtain.

        // Strategy:
        // 1. Black Container.
        // 2. Ball expands. Covers container.
        // 3. Container background set to transparent (or unmounts).
        // 4. Ball shrinks, revealing what sets behind it (The Site).

        tl.to(container, { backgroundColor: 'transparent', duration: 0 }, "-=0.2") // Make bg transparent just as ball fills

        tl.to(line, {
            scale: 0.16, // Target ~20px (120 * 0.166 = 20)
            duration: 1.0,
            ease: 'back.out(1.7)' // Elastic bounce back as requested
        })

        // Phase 5: Handoff handled by onComplete

    }, [])

    if (!active) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
            <div
                ref={lineRef}
                className="relative"
            />
        </div>
    )
}
