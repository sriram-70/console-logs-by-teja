'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/store/useScrollStore'

gsap.registerPlugin(ScrollTrigger)

export function ThinkingFramework() {
    const containerRef = useRef<HTMLElement>(null)
    const spineRef = useRef<HTMLDivElement>(null)
    const stepsListRef = useRef<HTMLDivElement>(null)
    const bgOverlayRef = useRef<HTMLDivElement>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)

    const steps = [
        { num: '01', title: 'Clarity', desc: 'Clarity comes first.\nVisuals follow.' },
        { num: '02', title: 'Action', desc: 'Every page starts with one clear objective.\nBook. Sign up. Inquire. Register.' },
        { num: '03', title: 'Friction', desc: 'Confusion slows decisions.\nSimplicity moves them forward.' },
        { num: '04', title: 'Attention', desc: 'Hierarchy shapes focus. Spacing creates direction.\nMotion reinforces intent.' },
        { num: '05', title: 'Intent', desc: 'Design and development move together.\nEvery decision supports the outcome.' }
    ]

    useGSAP(() => {
        const section = containerRef.current
        if (!section) return
        gsap.set(".process-step", { opacity: 0 }); // Hidden initially

        // Use matchMedia for responsive UI logic
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const isDesktop = context.conditions ? context.conditions.isDesktop : true;
            const targetX = isDesktop ? "25vw" : "15vw";
            const itemHeight = isDesktop ? 350 : 250;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.8,
                    onEnter: () => useScrollStore.getState().setIsThinkingActive(true),
                    onEnterBack: () => {
                        useScrollStore.getState().setIsThinkingActive(true)
                        gsap.to(section, { opacity: 1, duration: 0.3, overwrite: 'auto' })
                    },
                    onLeave: () => {
                        useScrollStore.getState().setIsThinkingActive(false)
                        gsap.to(section, { opacity: 0, duration: 0.3, overwrite: 'auto' })
                    },
                    onLeaveBack: () => useScrollStore.getState().setIsThinkingActive(false),
                }
            })

            const headerWords = document.querySelectorAll('.tf-word')

            // Set initial state for header text
            gsap.set(headerWords, {
                opacity: 0,
                filter: 'blur(10px)',
                y: 20
            })

            // Text reveal scrub sequence right at the absolute beginning of the scroll
            tl.to(headerWords, {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 0.5,
                stagger: 0.15,
                ease: 'power2.out'
            }, 0)

            const targetLeft = isDesktop ? "35vw" : "25vw";

            // 1. The Shift (Horizontal to Vertical Line)
            tl.to(spineRef.current, {
                rotation: 90,
                width: "75vh",
                top: "62.5vh", // Center is at 62.5vh -> top edge sits cleanly at 25vh, well below header
                left: targetLeft,
                ease: "power3.inOut",
                duration: 1.2
            }, 0)

            // Reveal the chevron indicator as line settles
            tl.to(spineRef.current, {
                "--mask-gap": "12px",
                duration: 0.5,
                ease: 'back.out(1.5)'
            } as any, 0.8)

            tl.fromTo(indicatorRef.current, {
                opacity: 0,
                scale: 0.5
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.5)'
            }, 0.8)

            // Function to transition between active steps in Typography layout
            const animateToStep = (index: number, startTime: number) => {
                tl.to(".process-step", {
                    opacity: (i: number) => i === index ? 1 : 0.15,
                    filter: (i: number) => i === index ? "blur(0px)" : "blur(2px)",
                    duration: 0.6,
                    ease: "power2.out"
                }, startTime)

                tl.to(stepsListRef.current, {
                    y: -index * itemHeight,
                    duration: 1,
                    ease: "power3.inOut"
                }, startTime)
            }

            // Init Step 00
            tl.to(".process-step", {
                opacity: (i: number) => i === 0 ? 1 : 0.15,
                filter: (i: number) => i === 0 ? "blur(0px)" : "blur(2px)",
                duration: 0.6,
                ease: "power2.out"
            }, 0)

            // Step 02 (Action)
            animateToStep(1, 2);
            tl.to(bgOverlayRef.current, { backgroundColor: "#0044AA", opacity: 0.6, duration: 1 }, 1.5)

            // Step 03 (Friction)
            animateToStep(2, 4);
            tl.to(bgOverlayRef.current, { backgroundColor: "#0A0A12", opacity: 0.9, duration: 1 }, 3.5)

            // Step 04 (Attention)
            animateToStep(3, 6);
            tl.to(bgOverlayRef.current, { backgroundColor: "#150505", opacity: 0.7, duration: 1 }, 5.5)

            // Step 05 (Intent)
            animateToStep(4, 8);
            tl.to(bgOverlayRef.current, { backgroundColor: "#000B11", opacity: 0.9, duration: 1 }, 7.5)

            // Step 06 (Outro): Seamless blend to the Site before Unpin
            tl.to([headerRef.current, headerWords, spineRef.current, indicatorRef.current, stepsListRef.current, bgOverlayRef.current], {
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut"
            }, 10)
        });
    }, { scope: containerRef })

    return (
        <section
            id="thinking-framework"
            ref={containerRef}
            className="w-full relative bg-transparent font-sans"
            style={{ height: '600vh' }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-end md:justify-center pointer-events-none">

                {/* THE BACKGROUND */}
                <div className="absolute inset-0 bg-transparent -z-10 pointer-events-auto" />
                <div ref={bgOverlayRef} className="absolute inset-0 z-0 pointer-events-none bg-transparent" />

                {/* HEADER (Scrub & Reveal) */}
                <div ref={headerRef} className="absolute top-[5%] left-[5%] z-50 pointer-events-auto mix-blend-difference">
                    <h2 className="text-6xl md:text-[5rem] font-black leading-[0.85] tracking-tighter text-white uppercase">
                        <span className="tf-word inline-block will-change-[filter,opacity,transform]">STRUCTURE</span><br />
                        <span className="tf-word inline-block will-change-[filter,opacity,transform] text-white/40">BEFORE STYLE.</span>
                    </h2>
                </div>

                {/* THE HORIZONTAL TO VERTICAL KINETIC LINE */}
                <div
                    ref={spineRef}
                    data-cursor-snap="true"
                    className="absolute h-[1.5px] bg-white z-10 origin-center"
                    style={{
                        width: "100%",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        WebkitMaskImage: "linear-gradient(to right, black 0%, black calc(33.333% - var(--mask-gap, 0px)), transparent calc(33.333% - var(--mask-gap, 0px)), transparent calc(33.333% + var(--mask-gap, 0px)), black calc(33.333% + var(--mask-gap, 0px)), black 100%)",
                        maskImage: "linear-gradient(to right, black 0%, black calc(33.333% - var(--mask-gap, 0px)), transparent calc(33.333% - var(--mask-gap, 0px)), transparent calc(33.333% + var(--mask-gap, 0px)), black calc(33.333% + var(--mask-gap, 0px)), black 100%)"
                    }}
                />

                {/* THE CHEVRON INDICATOR */}
                <div
                    ref={indicatorRef}
                    className="absolute z-20 flex items-center justify-center opacity-0 -translate-x-1/2 -translate-y-1/2 left-[25vw] md:left-[35vw]"
                    style={{ top: "50%" }}
                >
                    <div className="w-6 h-6 flex items-center justify-center relative bg-transparent">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="absolute overflow-visible">
                            <path d="M 12 0 L 18 12 L 12 24" />
                        </svg>
                    </div>
                </div>

                {/* TYPOGRAPHIC LAYOUT: Right-Center List */}
                {/* 
                    Align the container vertically centered so that when y is 0, the very center of the first item perfectly aligns with the screen center (the chevron position).
                    Since item height is 350px (Desktop), we offset by half of that to guarantee center alignment: -175px. 
                */}
                <div
                    className="absolute left-[35vw] md:left-[45vw] w-[60vw] md:w-[45vw] overflow-visible z-30 pointer-events-auto top-1/2 -translate-y-[125px] md:-translate-y-[175px]"
                >
                    <div ref={stepsListRef} className="absolute top-0 left-0 w-full flex flex-col">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="process-step flex flex-col items-start justify-center h-[250px] md:h-[350px] max-w-2xl px-6 md:px-0"
                            >
                                <div className="flex items-center gap-4 mb-2 md:mb-4">
                                    <span
                                        className="text-white font-mono text-lg md:text-2xl tracking-widest relative z-0 inline-block pointer-events-auto"
                                        data-cursor-phase={`WORKS/${step.title.toUpperCase()}`}
                                    >
                                        {step.num} <span className="text-white/40">//</span>
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-xs md:text-lg text-white/70 leading-relaxed font-mono whitespace-pre-line max-w-[80%]">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
