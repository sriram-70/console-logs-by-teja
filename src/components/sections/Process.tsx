import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScrollStore } from '@/store/useScrollStore'

gsap.registerPlugin(ScrollTrigger)

export function Process() {
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const pointsRef = useRef<(HTMLDivElement | null)[]>([])

    const setProcessProgress = useScrollStore((state) => state.setProcessProgress)
    const setIsProcessActive = useScrollStore((state) => state.setIsProcessActive)

    useGSAP(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        // We pin the section and make it very long for a cinematic finish
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=250%', // Extended scroll distance to accommodate the explosion
                pin: true,
                scrub: 0.5,
                snap: {
                    snapTo: [0, 0.25, 0.5, 0.75, 1], // Perfect alignment at each point and the final void
                    duration: { min: 0.1, max: 0.3 },
                    delay: 0,
                    ease: 'power1.inOut'
                },
                onEnter: () => setIsProcessActive(true),
                onEnterBack: () => setIsProcessActive(true),
                onLeave: () => {
                    setIsProcessActive(false)
                    setProcessProgress(1)
                },
                onLeaveBack: () => {
                    setIsProcessActive(false)
                    setProcessProgress(0)
                },
                onUpdate: (self) => {
                    setProcessProgress(self.progress)

                    // Handle native blur/reveal logic based on 0, 0.25, 0.5, 0.75 offsets
                    pointsRef.current.forEach((point, index) => {
                        if (!point) return
                        const targetProgress = index * 0.25
                        const distance = Math.abs(self.progress - targetProgress)

                        if (distance < 0.12) {
                            gsap.to(point, { opacity: 1, filter: 'blur(0px)', duration: 0.3, overwrite: 'auto' })
                        } else {
                            gsap.to(point, { opacity: 0.2, filter: 'blur(10px)', duration: 0.3, overwrite: 'auto' })
                        }
                    })
                }
            }
        })

        pointsRef.current.forEach((point, i) => {
            if (!point) return
            if (i === 0) {
                gsap.set(point, { opacity: 1, filter: 'blur(0px)' })
            } else {
                gsap.set(point, { opacity: 0.2, filter: 'blur(10px)' })
            }
        })

        const headerWords = document.querySelectorAll('.process-word')

        // Independent scroll trigger for the header to reveal much earlier (before padding/pinning)
        gsap.fromTo(headerWords,
            { opacity: 0, filter: 'blur(10px)', y: 20 },
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%', // Triggers early as section enters viewport
                    toggleActions: 'play none none reverse'
                }
            }
        )

        // 1. Move the foreground track
        tl.to(track, {
            xPercent: -75,
            ease: 'none',
            duration: 0.75 // Takes exactly 75% of the total scroll
        }, 0)

        // Fade out foreground section text to blend into the next
        tl.to(section, {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.inOut'
        }, 0.75)

    }, { scope: sectionRef, dependencies: [setProcessProgress, setIsProcessActive] })

    const phases = [
        {
            num: '01',
            title: 'Discovery & Alignment',
            desc: 'We define audience, offer, and primary action.'
        },
        {
            num: '02',
            title: 'Structure & Wireframe',
            desc: 'Conversion-focused layout planning before visuals.'
        },
        {
            num: '03',
            title: 'Design & Development',
            desc: 'Modern, responsive, performance-optimized build.'
        },
        {
            num: '04',
            title: 'Refine & Launch',
            desc: 'Polish, testing, and deployment — handled end-to-end.'
        }
    ]

    return (
        <section ref={sectionRef} id="process" className="h-screen w-full relative bg-transparent overflow-hidden z-10">

            {/* STICKY HEADER (Properly spaced below dynamic island, perfectly left aligned) */}
            <div className="absolute top-[12vh] md:top-[15vh] left-0 w-full px-8 md:pl-[5vw] md:pr-[5vw] z-50 pointer-events-none mix-blend-difference flex flex-col items-start gap-12 md:w-full">
                <h2 className="text-[8.5vw] md:text-[6.5vw] font-black leading-[0.9] tracking-tighter text-white uppercase">
                    <span className="process-word inline-block will-change-[filter,opacity,transform]">INTENTIONAL —</span><br />
                    <span className="process-word inline-block text-white/40 will-change-[filter,opacity,transform]">FROM START TO LAUNCH.</span>
                </h2>
            </div>

            {/* HORIZONTAL TRACK CONTAINER */}
            <div className="absolute top-0 left-0 h-full w-[400%] flex items-center bg-transparent" ref={trackRef}>

                {/* THE 4 PHASES Spread evenly (each takes exactly 25% of the 400% width = 1 viewport width) */}
                {phases.map((phase, i) => (
                    <div key={i} className="w-1/4 h-full flex flex-col items-center justify-center relative z-10 pointer-events-none">

                        {/* INFO REVEAL CONTAINER (Bottom center aligned, vertically balanced) */}
                        <div
                            ref={(el) => { pointsRef.current[i] = el }}
                            className="flex flex-col items-center justify-end w-full max-w-2xl absolute bottom-[14vh] md:bottom-[16vh] left-1/2 -translate-x-1/2 px-8 pointer-events-auto text-center"
                        >
                            <span
                                className="font-mono text-sm text-cyan-400 tracking-widest mb-4 inline-block pointer-events-auto"
                                data-cursor-phase={`WORKS/${phase.title.split(' ')[0].toUpperCase()}`}
                            >
                                [ PHASE_{phase.num} ]
                            </span>
                            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:text-emerald-400 transition-colors mb-3">
                                {phase.title}
                            </h3>
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium">
                                {phase.desc}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

            {/* Removed gradient overlays for a more seamless blend into the main site */}
        </section>
    )
}

// Background layer exported for precise DOM z-indexing outside the pinned section
export function ProcessBackgroundLayer() {
    const isProcessActive = useScrollStore((state) => state.isProcessActive)
    const processProgress = useScrollStore((state) => state.processProgress)

    const layerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const point4Ref = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<(HTMLDivElement | null)[]>([])
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    useGSAP(() => {
        // Paused timeline that perfectly matches the 0-1 structure of the main section
        const tl = gsap.timeline({ paused: true })

        // 1. Move track exactly with the main text
        tl.to(trackRef.current, {
            xPercent: -75,
            ease: 'none',
            duration: 0.75
        }, 0)

        // 2. The Shatter Event!
        if (particlesRef.current.length > 0) {
            tl.set(particlesRef.current, { opacity: 0, scale: 0 }, 0)
            tl.set(particlesRef.current, { opacity: 1, scale: 1, x: 0, y: 0 }, 0.75)

            tl.to(particlesRef.current, {
                x: () => gsap.utils.random(-800, 800) + 'px',
                y: () => gsap.utils.random(-800, 800) + 'px',
                scale: () => gsap.utils.random(0.5, 2),
                opacity: 0,
                duration: 0.25,
                // Natural chaotic explosion, no stagger
                ease: 'expo.out'
            }, 0.75)
        }

        // Fade line
        tl.to(lineRef.current, { opacity: 0, duration: 0.15, ease: 'power2.out' }, 0.78)

        // Collapse point 4
        tl.to(point4Ref.current, { scale: 0, opacity: 0, filter: 'blur(20px)', duration: 0.15, ease: 'power4.in' }, 0.75)

        // Fade out entire layer logically
        tl.to(layerRef.current, { opacity: 0, duration: 0.25, ease: 'power2.inOut' }, 0.75)

        tlRef.current = tl
    }, [])

    // Ensure the background animation perfectly scrubs along with the global progress
    useGSAP(() => {
        if (tlRef.current) {
            tlRef.current.progress(processProgress)
        }
    }, [processProgress])

    return (
        <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 -z-10 ${isProcessActive ? 'opacity-100' : 'opacity-0'}`}>
            <div ref={layerRef} className="absolute inset-0">
                <div
                    ref={trackRef}
                    className="absolute top-0 left-0 h-full w-[400%] flex items-center bg-transparent will-change-transform"
                >
                    {/* CONTINUOUS HORIZONTAL LINE */}
                    <div ref={lineRef} data-cursor-snap="true" className="absolute top-1/2 left-[12.5%] w-[75%] h-[2px] bg-white/20 -translate-y-1/2 origin-center"></div>

                    {/* THE 4 PHASES Spread evenly */}
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="w-1/4 h-full flex flex-col items-center justify-center relative">
                            {/* THE POINT ON THE LINE AND ITS SHATTER PARTICLES */}
                            <div
                                ref={i === 3 ? point4Ref : null}
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]`}
                            >
                                {i === 3 && Array.from({ length: 45 }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        ref={(el) => { particlesRef.current[idx] = el }}
                                        className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#34d399] will-change-transform opacity-0"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
