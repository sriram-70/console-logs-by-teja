'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'


interface LoaderProps {
    onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(true)

    useEffect(() => {
        const line = lineRef.current
        const container = containerRef.current

        if (!line || !container) return

        const tl = gsap.timeline({
            onComplete: () => {
                setActive(false)
                onComplete()
            }
        })

        // Ensure initial state
        gsap.set(line, {
            width: 4,
            height: 0,
            borderRadius: 2,
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
        tl.to(container, { backgroundColor: 'transparent', duration: 0 }, "-=0.2") // Make bg transparent just as ball fills

        tl.to(line, {
            scale: 0.16, // Target ~20px (120 * 0.166 = 20)
            duration: 1.0,
            ease: 'back.out(1.7)' // Elastic bounce back as requested
        })

        // Cleanup
        return () => {
            tl.kill()
        }

    }, [onComplete])

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
