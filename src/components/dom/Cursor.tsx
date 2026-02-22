'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const lastHoveredRef = useRef<HTMLElement | null>(null)

    // States for React rendering (like text), but we use GSAP for performance on pos
    const [cursorText, setCursorText] = useState('')

    // Reset on route change
    useEffect(() => {
        setCursorText('')
        if (lastHoveredRef.current) {
            gsap.to(lastHoveredRef.current, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
            lastHoveredRef.current = null
        }
    }, [pathname])

    useEffect(() => {
        const cursor = cursorRef.current
        const textParent = textRef.current
        if (!cursor) return

        let isSnapped = false
        let isMetaExpanded = false

        const ctx = gsap.context(() => {
            // Initial State: 20px solid white dot
            gsap.set(cursor, {
                xPercent: -50,
                yPercent: -50,
                width: 20,
                height: 20,
                backgroundColor: 'white',
                border: '0px solid transparent',
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            })

            // 1. Core Physics: high-frequency Lerp / GSAP QuickSetter (0.15 duration)
            const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" })
            const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" })

            const onMouseMove = (e: MouseEvent) => {
                let targetX = e.clientX
                let targetY = e.clientY

                // 2. Structural Snapping logic
                const snapLines = document.querySelectorAll('.kinetic-line, [data-cursor-snap]')
                let currentlySnapped = false

                snapLines.forEach(line => {
                    if (currentlySnapped) return

                    // Ignore snap points on hidden layers (like ProcessBackgroundLayer when inactive)
                    let el: HTMLElement | null = line as HTMLElement
                    let isVisible = true
                    while (el && el !== document.body) {
                        const style = window.getComputedStyle(el)
                        if (style.opacity === '0' || style.visibility === 'hidden' || style.display === 'none') {
                            isVisible = false
                            break
                        }
                        el = el.parentElement
                    }
                    if (!isVisible) return

                    const rect = line.getBoundingClientRect()

                    // Relaxed hit area
                    if (targetX >= rect.left - 30 && targetX <= rect.right + 30 &&
                        targetY >= rect.top - 30 && targetY <= rect.bottom + 30) {

                        const clampedX = Math.max(rect.left, Math.min(targetX, rect.right))
                        const clampedY = Math.max(rect.top, Math.min(targetY, rect.bottom))

                        const dist = Math.sqrt(Math.pow(targetX - clampedX, 2) + Math.pow(targetY - clampedY, 2))
                        if (dist <= 30) {
                            currentlySnapped = true
                            targetX = clampedX
                            targetY = clampedY
                        }
                    }
                })

                // Apply quickTo
                xTo(targetX)
                yTo(targetY)

                // Animate snap state changes
                if (currentlySnapped && !isSnapped && !isMetaExpanded) {
                    isSnapped = true
                    gsap.to(cursor, { width: 40, height: 40, backgroundColor: 'transparent', border: '1px solid white', duration: 0.3, ease: 'power3.out' })
                } else if (!currentlySnapped && isSnapped && !isMetaExpanded) {
                    isSnapped = false
                    gsap.to(cursor, { width: 20, height: 20, backgroundColor: 'white', border: '0px solid transparent', duration: 0.3, ease: 'power3.out' })
                }
            }

            // 3. Metadata Expansion & Interactive scaling
            const onMouseOver = (e: MouseEvent) => {
                const target = e.target as HTMLElement

                // Metadata Expansion
                const metaPhase = target.closest('[data-cursor-phase]') as HTMLElement | null
                if (metaPhase) {
                    isMetaExpanded = true
                    const phaseText = metaPhase.getAttribute('data-cursor-phase') || 'SYS_ACTIVE'
                    setCursorText(`DATA_PATH: /${phaseText}`)
                    gsap.to(cursor, { width: 100, height: 100, backgroundColor: 'white', border: '0px solid transparent', duration: 0.4, ease: 'back.out(1.5)' })
                    if (textParent) gsap.to(textParent, { opacity: 1, duration: 0.2 })
                } else if (isMetaExpanded) {
                    isMetaExpanded = false
                    setCursorText('')
                    if (textParent) gsap.to(textParent, { opacity: 0, duration: 0.2 })
                    // Revert based on snap state
                    if (isSnapped) {
                        gsap.to(cursor, { width: 40, height: 40, backgroundColor: 'transparent', border: '1px solid white', duration: 0.3, ease: 'power3.out' })
                    } else {
                        gsap.to(cursor, { width: 20, height: 20, backgroundColor: 'white', border: '0px solid transparent', duration: 0.3, ease: 'power3.out' })
                    }
                }

                // Interactive bouncy scaling (from original logic)
                const interactive = target.closest('a, button, input, textarea, .interactive') as HTMLElement | null
                if (interactive && !interactive.classList.contains('no-cursor-magnify') && !isMetaExpanded) {
                    if (interactive !== lastHoveredRef.current) {
                        if (lastHoveredRef.current) gsap.to(lastHoveredRef.current, { scale: 1, duration: 0.3 })
                        gsap.to(interactive, { scale: 1.15, duration: 0.3, ease: 'back.out(1.7)', overwrite: 'auto' })
                        lastHoveredRef.current = interactive
                        // large hover dot (solid complete circle)
                        if (!isSnapped) gsap.to(cursor, { width: 100, height: 100, backgroundColor: 'white', border: '0px solid transparent', duration: 0.3 })
                    }
                } else if (!isMetaExpanded) {
                    if (lastHoveredRef.current) {
                        gsap.to(lastHoveredRef.current, { scale: 1, duration: 0.3 })
                        lastHoveredRef.current = null
                        if (!isSnapped) gsap.to(cursor, { width: 20, height: 20, backgroundColor: 'white', border: '0px solid transparent', duration: 0.3 })
                    }
                }
            }

            // 4. Click Feedback (Handshake) - Glitch Ripple
            const onMouseDown = (e: MouseEvent) => {
                // Determine active accent color
                let rippleColor = 'rgba(255, 255, 255, 0.8)' // Default white

                // Very quick hack: Check the closest section's accent color implicitly by id or data-accent
                const structureSec = !!e.target && (e.target as Element).closest('#thinking-framework, #positioning')
                const intentSec = !!e.target && (e.target as Element).closest('#process')
                if (structureSec) rippleColor = 'rgba(34, 211, 238, 0.8)' // Cyan
                if (intentSec) rippleColor = 'rgba(168, 85, 247, 0.8)' // Purple (e.g., bg-purple-500)

                // Create ripple element
                const ripple = document.createElement('div')
                ripple.className = 'fixed pointer-events-none rounded-full z-[9998] mix-blend-difference'
                ripple.style.left = e.clientX + 'px'
                ripple.style.top = e.clientY + 'px'
                ripple.style.backgroundColor = 'transparent'
                ripple.style.border = `2px solid ${rippleColor}`
                ripple.style.transform = 'translate(-50%, -50%)'
                document.body.appendChild(ripple)

                // 0.3s Glitch Ripple
                gsap.fromTo(ripple, {
                    width: 0, height: 0, opacity: 1, filter: 'blur(0px)'
                }, {
                    width: 60, height: 60, opacity: 0, filter: 'blur(4px)', duration: 0.3, ease: 'power2.out',
                    onComplete: () => ripple.remove()
                })

                // Cursor glitch itself
                gsap.to(cursor, { scale: 0.5, duration: 0.1, yoyo: true, repeat: 1 })
            }

            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseover', onMouseOver)
            window.addEventListener('mousedown', onMouseDown)

            return () => {
                window.removeEventListener('mousemove', onMouseMove)
                window.removeEventListener('mouseover', onMouseOver)
                window.removeEventListener('mousedown', onMouseDown)
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-visible"
            style={{ transform: 'translate(-50%, -50%)' }}
        >
            <div
                ref={textRef}
                className="opacity-0 font-mono text-[5px] leading-none whitespace-nowrap text-black font-black tracking-widest absolute"
            >
                {cursorText}
            </div>
        </div>
    )
}
