'use client'

import { useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function Positioning() {
    const containerRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if (!container) return

        const words = textRef.current?.querySelectorAll('.word')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: '+=200%',
                pin: true,
                scrub: 1.5, // Buttery smooth response
            }
        })

        // Elegant fade up for header
        tl.fromTo(headerRef.current, {
            autoAlpha: 0,
            y: 40,
            filter: 'blur(10px)'
        }, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out'
        }, 0)

        // Animated vertical structural line
        tl.fromTo(lineRef.current, {
            scaleY: 0,
            transformOrigin: "top"
        }, {
            scaleY: 1,
            duration: 1,
            ease: 'power3.inOut'
        }, 0.2)

        // Word-by-word scrub reveal through opacity and blur
        if (words) {
            tl.fromTo(words, {
                opacity: 0.15,
                filter: 'blur(3px)',
                y: 10
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 2,
                stagger: 0.05,
                ease: 'power2.out'
            }, 0.5)
        }

        // Final fade out before unpinning to avoid overlap with next section
        tl.to(container, {
            opacity: 0,
            duration: 0.5,
            ease: 'none'
        }, "+=0.5")

    }, { scope: containerRef })

    // Build the text manually to allow fine-grained GSAP control over each word
    const textElements = useMemo(() => {
        const elements: React.ReactNode[] = []
        let keyCount = 0

        const rawText = "Good design looks impressive, but |perfect design moves people.| Every page I build is structured around a |singular goal| and a |definitive action| — whether that’s bookings, signups, or inquiries — ensuring you get |real-world results|, not just compliments."

        // Simple manual split parsing: | marks highlighted chunks.
        const segments = rawText.split('|')
        segments.forEach((segment, i) => {
            const isHighlight = i % 2 === 1;
            const words = segment.split(/(\s+|—)/).filter(Boolean);

            words.forEach(word => {
                if (word.trim() === '') {
                    // It's just space(s)
                    elements.push(<span key={keyCount++}>{word}</span>)
                } else if (word === '—') {
                    // Em-dash separator
                    elements.push(<span key={keyCount++} className="word inline-block opacity-15 text-white/40">—</span>)
                } else {
                    // Actual word to be animated
                    elements.push(
                        <span
                            key={keyCount++}
                            className={`word inline-block will-change-[filter,opacity,transform] opacity-15 ${isHighlight ? 'text-cyan-400 font-medium drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-white'}`}
                        >
                            {word}
                        </span>
                    )
                }
            })
        })
        return elements
    }, [])

    return (
        <section ref={containerRef} id="positioning" className="w-full h-svh relative bg-transparent z-10 flex flex-col justify-center px-8 md:pl-[8vw]">
            <div className="flex flex-col items-start gap-8 md:gap-14 w-full max-w-6xl pointer-events-auto">

                {/* HEADER */}
                <div ref={headerRef} className="will-change-[transform,opacity,filter]">
                    <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-white/40 mb-4 block uppercase leading-none">
                        [ The Philosophy ]
                    </span>
                    <h2 className="text-[11vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference">
                        CLEAR OVER<br />
                        <span className="text-white/40">CLEVER.</span>
                    </h2>
                </div>

                {/* LOG BODY */}
                <div className="relative pl-6 md:pl-10 lg:pl-12 py-2">
                    {/* The animated structural line */}
                    <div ref={lineRef} data-cursor-snap="true" className="absolute left-0 top-0 bottom-0 w-[2px] bg-linear-to-b from-cyan-400 via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)] will-change-transform" />

                    {/* The scrub-reveal text container */}
                    <div
                        ref={textRef}
                        className="text-[1.35rem] md:text-[2.5rem] lg:text-[50px] font-light leading-[1.3] tracking-tight max-w-5xl"
                    >
                        {textElements}
                    </div>
                </div>
            </div>
        </section>
    )
}
