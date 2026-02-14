'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        const ctx = gsap.context(() => {
            // Initial State: Slightly larger Dot, centered
            gsap.set(cursor, {
                xPercent: -50,
                yPercent: -50,
                width: 20,
                height: 20,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            })

            // Instant follow movement using set (safest for avoiding quickTo errors)
            const onMouseMove = (e: MouseEvent) => {
                gsap.set(cursor, { x: e.clientX, y: e.clientY })
            }

            window.addEventListener('mousemove', onMouseMove)
            return () => window.removeEventListener('mousemove', onMouseMove)
        })

        return () => ctx.revert()
    }, [])

    // Interaction & Scale Logic
    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        const targets = document.querySelectorAll('a:not(.no-cursor-magnify), button:not(.no-cursor-magnify), input:not(.no-cursor-magnify), textarea:not(.no-cursor-magnify), .interactive:not(.no-cursor-magnify)')

        const onMouseEnter = (e: Event) => {
            setIsHovering(true)
            const target = e.currentTarget as HTMLElement
            gsap.to(target, { scale: 1.15, duration: 0.3, ease: 'back.out(1.7)', overwrite: 'auto' })
        }
        const onMouseLeave = (e: Event) => {
            setIsHovering(false)
            const target = e.currentTarget as HTMLElement
            gsap.to(target, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
        }

        // Add listeners
        targets.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnter)
            el.addEventListener('mouseleave', onMouseLeave)
        })

        // Animate State Changes
        if (isHovering) {
            // SCALE UP: Large "Spotlight" lens
            // mix-blend-difference with white bg will invert black text to white, and white text to black.
            gsap.to(cursor, {
                width: 100,
                height: 100,
                duration: 0.4,
                ease: 'power3.out'
            })
        } else {
            // SCALE DOWN: Precise dot
            gsap.to(cursor, {
                width: 20,
                height: 20,
                duration: 0.4,
                ease: 'power3.out'
            })
        }

        return () => {
            targets.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter)
                el.removeEventListener('mouseleave', onMouseLeave)
            })
        }
    }, [isHovering])

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
            style={{ transform: 'translate(-50%, -50%)' }}
        />
    )
}
