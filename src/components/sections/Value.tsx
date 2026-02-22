'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/store/useScrollStore'

gsap.registerPlugin(ScrollTrigger)

const DIAGNOSTIC_POINTS = [
    {
        id: '01',
        title: 'Strategic Messaging Hierarchy',
        description: 'Your offer is understood in seconds, not after scrolling.',
    },
    {
        id: '02',
        title: 'Intentional CTA Placement',
        description: 'Clear actions are placed where momentum is naturally highest.',
    },
    {
        id: '03',
        title: 'Mobile-First Performance',
        description: 'Fast, frictionless experiences keep attention focused on action.',
    },
    {
        id: '04',
        title: 'Focused Execution',
        description: 'No ornamental complexity. Only what moves conversion forward.',
    },
]

export function Value() {
    const sectionRef = useRef<HTMLElement>(null)
    const pointRefs = useRef<(HTMLDivElement | null)[]>([])
    const fillRef = useRef<HTMLDivElement>(null)
    const activeIndexRef = useRef(0)

    const setDiagnosticProgress = useScrollStore((state) => state.setDiagnosticProgress)
    const setIsDiagnosticActive = useScrollStore((state) => state.setIsDiagnosticActive)
    const setDiagnosticActivePoint = useScrollStore((state) => state.setDiagnosticActivePoint)

    useEffect(() => {
        const section = sectionRef.current
        const fillLine = fillRef.current
        const points = pointRefs.current.filter(Boolean) as HTMLDivElement[]
        if (!section || !fillLine || points.length !== DIAGNOSTIC_POINTS.length) return

        const smoothstep = (edge0: number, edge1: number, x: number) => {
            const t = gsap.utils.clamp(0, 1, (x - edge0) / (edge1 - edge0))
            return t * t * (3 - 2 * t)
        }

        const getPointOpacities = (progress: number) => {
            const opacities = [0, 0, 0, 0]

            if (progress < 0.2) {
                const t = smoothstep(0, 1, progress / 0.2)
                opacities[0] = t
                return opacities
            }

            if (progress < 0.4) {
                const t = smoothstep(0, 1, (progress - 0.2) / 0.2)
                opacities[0] = 1 - t
                opacities[1] = t
                return opacities
            }

            if (progress < 0.6) {
                const t = smoothstep(0, 1, (progress - 0.4) / 0.2)
                opacities[1] = 1 - t
                opacities[2] = t
                return opacities
            }

            if (progress < 0.8) {
                const t = smoothstep(0, 1, (progress - 0.6) / 0.2)
                opacities[2] = 1 - t
                opacities[3] = t
                return opacities
            }

            opacities[3] = 1
            return opacities
        }

        const ctx = gsap.context(() => {
            gsap.set(fillLine, { height: '0%' })
            gsap.set(points, { autoAlpha: 0, filter: 'blur(20px)' })
            activeIndexRef.current = 0

            setDiagnosticActivePoint(0)

            const valueWords = document.querySelectorAll('.value-word')
            if (valueWords.length > 0) {
                gsap.fromTo(valueWords, {
                    opacity: 0,
                    filter: 'blur(15px)',
                    y: 20
                }, {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 10%',
                        toggleActions: 'play reverse play reverse' // Scrub & Reveal Effect Entry + Exit
                    }
                })
            }

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onEnter: () => setIsDiagnosticActive(true),
                onEnterBack: () => setIsDiagnosticActive(true),
                onLeave: () => {
                    setIsDiagnosticActive(false)
                    setDiagnosticProgress(1)
                    gsap.set(fillLine, { height: '100%' })
                },
                onLeaveBack: () => {
                    setIsDiagnosticActive(false)
                    setDiagnosticProgress(0)
                    activeIndexRef.current = 0
                    setDiagnosticActivePoint(0)
                    gsap.set(fillLine, { height: '0%' })
                    gsap.set(points, { autoAlpha: 0, filter: 'blur(20px)' })
                },
                onUpdate: (self) => {
                    const progress = self.progress
                    setDiagnosticProgress(progress)
                    const fillProgress = gsap.utils.clamp(0, 1, progress / 0.8)
                    gsap.set(fillLine, { height: `${fillProgress * 100}%` })

                    const nextIndex =
                        progress < 0.2 ? 0 :
                            progress < 0.4 ? 1 :
                                progress < 0.6 ? 2 : 3
                    if (nextIndex !== activeIndexRef.current) {
                        activeIndexRef.current = nextIndex
                        setDiagnosticActivePoint(nextIndex)
                    }

                    const opacities = getPointOpacities(progress)
                    points.forEach((point, index) => {
                        const opacity = opacities[index]
                        gsap.set(point, {
                            autoAlpha: opacity,
                            filter: `blur(${(1 - opacity) * 20}px)`,
                        })
                    })
                },
            })
        }, section)

        return () => {
            setIsDiagnosticActive(false)
            setDiagnosticProgress(0)
            ctx.revert()
        }
    }, [
        setDiagnosticActivePoint,
        setDiagnosticProgress,
        setIsDiagnosticActive,
    ])

    return (
        <section ref={sectionRef} id="services" className="relative h-[400vh] z-40 pointer-events-none">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute left-[54%] md:left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-px z-80">
                    <div className="absolute inset-0 w-px bg-white/10" />
                    <div ref={fillRef} className="absolute bottom-0 left-0 w-px bg-[#00F2FF]" />
                </div>

                <h2
                    className="absolute left-[5vw] top-1/2 -translate-y-1/2 z-[90] text-[11vw] md:text-[6vw] font-black leading-[0.83] text-white uppercase"
                    style={{ color: '#FFFFFF', letterSpacing: '-0.05em' }}
                >
                    <span className="value-word inline-block will-change-[filter,opacity,transform]">CLARITY DRIVES</span><br />
                    <span className="value-word inline-block will-change-[filter,opacity,transform]">CONVERSION.</span>
                </h2>

                <div className="grid h-full grid-cols-1 md:grid-cols-[42%_58%] px-8 md:px-[5vw]">
                    <div />
                    <div className="relative flex items-center justify-end pl-[16vw] md:pl-[18vw] pr-[2vw]">
                        <div className="relative z-[95] h-[320px] w-full max-w-[34rem] pointer-events-auto">
                            {DIAGNOSTIC_POINTS.map((point, index) => (
                                <div
                                    key={point.id}
                                    ref={(element) => {
                                        pointRefs.current[index] = element
                                    }}
                                    className="absolute inset-0 flex flex-col justify-center"
                                >
                                    <p
                                        className="mb-4 text-xs md:text-sm uppercase tracking-[0.22em] text-white"
                                        style={{
                                            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                                        }}
                                    >
                                        {`${point.id} //`}
                                    </p>

                                    <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
                                        {point.title}
                                    </h3>

                                    <p className="mt-6 text-lg md:text-2xl text-white leading-relaxed">
                                        {point.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
