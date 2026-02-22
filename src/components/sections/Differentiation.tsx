'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function Differentiation() {
    const containerRef = useRef<HTMLElement>(null)
    const headerBlockRef = useRef<HTMLDivElement>(null)

    // Grid Elements
    const gridRef = useRef<HTMLDivElement>(null)
    const leftTextRef = useRef<HTMLParagraphElement>(null)
    const listLinesRef = useRef<(HTMLDivElement | null)[]>([])

    // Artist Reveal Elements
    const artistContainerRef = useRef<HTMLDivElement>(null)
    const artistTitleRef = useRef<HTMLHeadingElement>(null)
    const artistSubRef = useRef<HTMLParagraphElement>(null)
    const finalTextRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if (!container) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5, // Buttery smooth scrub
            }
        })

        // Initial setup for elegance
        const headerWords = document.querySelectorAll('.diff-word')
        gsap.set(headerWords, {
            opacity: 0,
            filter: 'blur(10px)',
            y: 20
        })

        gsap.set(gridRef.current, { y: '30vh', autoAlpha: 0 })
        gsap.set(leftTextRef.current, { y: 60, autoAlpha: 0 })
        listLinesRef.current.forEach(line => {
            if (line) gsap.set(line, { x: 50, autoAlpha: 0 })
        })

        gsap.set(artistContainerRef.current, { autoAlpha: 0 })
        gsap.set(artistTitleRef.current, { y: 120, autoAlpha: 0, scale: 0.9, filter: 'blur(15px)' })
        gsap.set(artistSubRef.current, { y: 40, autoAlpha: 0 })
        gsap.set(finalTextRef.current, { autoAlpha: 0 })

        // PHASE 0: Text reveal scrub sequence
        tl.to(headerWords, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        }, 0)

        // PHASE 1: Header slides up and gracefully fades
        tl.to(headerBlockRef.current, {
            y: '-40vh',
            autoAlpha: 0,
            duration: 2,
            ease: 'power3.inOut'
        }, 1.5)

        // PHASE 2: Bring in the Magazine-Style Grid
        tl.to(gridRef.current, { y: '0vh', autoAlpha: 1, duration: 2, ease: 'power3.out' }, 2.5)

        // Parallax the text up
        tl.to(leftTextRef.current, { y: 0, autoAlpha: 1, duration: 2, ease: 'power3.out' }, 3.0)

        // Firm stagger for the strict rules
        tl.to(listLinesRef.current, {
            x: 0,
            autoAlpha: 1,
            duration: 1.5,
            stagger: 0.4,
            ease: 'expo.out'
        }, 3.5)

        // PHASE 3: Grid flows completely upwards and fades out into darkness
        tl.to(gridRef.current, { y: '-30vh', autoAlpha: 0, duration: 2, ease: 'power3.in' }, 7.0)

        // PHASE 4: The Climax - Glowing 'Developer Artist' rises from the void
        tl.to(artistContainerRef.current, { autoAlpha: 1, duration: 2, ease: 'power2.out' }, 8.0)

        tl.to(artistTitleRef.current, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 2.5,
            ease: 'expo.out'
        }, 8.5)

        tl.to(artistSubRef.current, { y: 0, autoAlpha: 1, duration: 1.5, ease: 'power3.out' }, 9.0)

        // PHASE 5: Reveal footer context
        tl.to(finalTextRef.current, { autoAlpha: 1, duration: 2, ease: 'none' }, 10.0)

        // End fade out transition
        tl.to(container, { opacity: 0, duration: 1, ease: 'none' }, 12.5)

    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="differentiation" className="w-full relative bg-transparent z-10" style={{ height: '500vh' }}>
            {/* The Sticky Cinematic Screen */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center pointer-events-none">

                {/* THE MASSIVE INTRO HEADER */}
                <div ref={headerBlockRef} className="absolute top-[20vh] left-[5vw] w-full px-8 md:pl-[5vw] pr-[5vw] will-change-transform pointer-events-auto">
                    <h2 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference">
                        <span className="diff-word inline-block will-change-[filter,opacity,transform]">DIRECT. FOCUSED.</span><br />
                        <span className="diff-word inline-block text-white/40 will-change-[filter,opacity,transform]">ACCOUNTABLE.</span>
                    </h2>
                </div>

                {/* THE MACRO-TYPOGRAPHY MANIFESTO GRID */}
                <div ref={gridRef} className="absolute inset-0 flex items-center px-8 md:px-[10vw] will-change-transform z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-[1400px] mx-auto">

                        {/* Left Column Statement */}
                        <div className="flex flex-col justify-center mt-32 lg:mt-0">
                            <p ref={leftTextRef} className="text-3xl md:text-[3rem] font-light text-white leading-[1.2] tracking-tight">
                                I work independently —<br /> handling <span className="font-semibold text-white/90">strategy, structure, design, development,</span> and <span className="text-cyan-400 font-semibold italic">launch</span> <br />
                                from start to finish.
                            </p>
                        </div>

                        {/* Right Column Strict Manifesto Rules */}
                        <div className="flex flex-col justify-center border-l-2 border-white/5 pl-8 lg:pl-16 space-y-8 lg:space-y-12">
                            {[
                                "No outsourcing.",
                                "No handoffs.",
                                "No confusion."
                            ].map((text, i) => (
                                <div
                                    key={i}
                                    ref={el => { listLinesRef.current[i] = el }}
                                    className="flex items-center gap-6"
                                >
                                    <div className="h-0.5 w-12 bg-cyan-400/50 block shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                    <p className="text-4xl md:text-6xl font-black tracking-tighter text-white/40 uppercase">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* THE CLIMAX RESOLUTION */}
                <div ref={artistContainerRef} className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs z-30">
                    <p className="text-white/50 font-mono tracking-[0.3em] text-sm md:text-lg mb-4 md:mb-8 uppercase">
                        So, I am your
                    </p>
                    <div className="overflow-visible py-4 md:py-8 px-4 text-center">
                        <h3 ref={artistTitleRef} style={{ fontFamily: 'var(--font-signature)' }} className="text-[5.5rem] md:text-[13rem] font-normal text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-cyan-400 to-blue-500 capitalize tracking-normal leading-[1.1] will-change-[filter,transform] -rotate-3">
                            Developer Artist
                        </h3>
                    </div>
                    <p ref={artistSubRef} className="mt-4 md:mt-8 text-xl md:text-4xl text-white/90 font-light tracking-[0.15em] uppercase text-center">
                        Clear by Design. <span className="font-semibold">Designed to Convert.</span>
                    </p>

                    <div ref={finalTextRef} className="absolute bottom-[10vh] left-0 w-full px-8 md:px-[10vw] flex flex-col md:flex-row justify-between items-end">
                        <div className="max-w-xl">
                            <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-light">
                                Every project is built with <span className="font-semibold text-white">focus and accountability</span>.<br />
                                Every decision has <span className="text-emerald-400 italic font-semibold">intent</span>.
                            </p>
                        </div>
                        <div className="max-w-xs text-left md:text-right mt-8 md:mt-0">
                            <p className="text-xs md:text-sm text-white/30 font-mono leading-relaxed tracking-wider">
                                I take on a limited number of projects to ensure clarity, speed, and quality.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
