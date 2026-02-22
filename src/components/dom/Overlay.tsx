'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { create } from 'zustand'
import { useGSAP } from '@gsap/react'

type HoverStore = {
    hoveredProject: string | null;
    setHoveredProject: (id: string | null) => void;
}
export const useHoverStore = create<HoverStore>((set) => ({
    hoveredProject: null,
    setHoveredProject: (id) => set({ hoveredProject: id }),
}))

function HoverImageDisplay() {
    const hoveredProject = useHoverStore(s => s.hoveredProject);
    const setHoveredProject = useHoverStore(s => s.setHoveredProject);

    useEffect(() => {
        // Clear any dangling hover state when this component mounts (e.g. going back from a project page)
        setHoveredProject(null);
    }, [setHoveredProject]);

    return (
        <div className="fixed top-1/2 left-[35vw] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[220px] md:w-[550px] md:h-[340px] lg:w-[750px] lg:h-[460px] z-0 pointer-events-none hidden md:block">
            {projects.map(project => (
                <div key={project.id} className={`absolute inset-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 origin-center ${hoveredProject === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    )
}
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { Hero } from '@/components/sections/Hero'
import { Value } from '@/components/sections/Value'
import { Positioning } from '@/components/sections/Positioning'
import { TechStack } from '@/components/sections/TechStack'
import { ThinkingFramework } from '@/components/sections/ThinkingFramework'
import { Process } from '@/components/sections/Process'
import { Differentiation } from '@/components/sections/Differentiation'

gsap.registerPlugin(ScrollTrigger)

export function Overlay() {
    const worksSectionRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        const section = worksSectionRef.current
        const heading = section?.querySelector('h2')

        if (!section || !heading) return

        // Set initial state
        gsap.set(section, { opacity: 0 })

        // 1. General section fade wrapper
        ScrollTrigger.create({
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: () => gsap.to(section, { opacity: 1, duration: 0.4, overwrite: 'auto' }),
            onLeave: () => gsap.to(section, { opacity: 0, duration: 0.4, overwrite: 'auto' }),
            onEnterBack: () => gsap.to(section, { opacity: 1, duration: 0.4, overwrite: 'auto' }),
            onLeaveBack: () => gsap.to(section, { opacity: 0, duration: 0.4, overwrite: 'auto' })
        })

        // 2. The Heading - Noticeable aggressive drop-in with heavy blur
        const headerWords = section.querySelectorAll('.overlay-word')
        gsap.fromTo(headerWords,
            { y: 20, filter: 'blur(15px)', opacity: 0 },
            {
                y: 0,
                filter: 'blur(0px)',
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'bottom 20%',
                    toggleActions: 'play reverse play reverse' // Reverses out when exiting!
                }
            }
        )

        // 3. Staggered Projects with lateral sweep and blur
        gsap.fromTo('.project-item',
            { x: 150, filter: 'blur(20px)', opacity: 0, scale: 0.95 },
            {
                x: 0,
                filter: 'blur(0px)',
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                    end: 'bottom 15%',
                    toggleActions: 'play reverse play reverse' // Reverses out when exiting!
                }
            }
        )
    }, { scope: worksSectionRef })

    return (
        <main className="w-full text-white font-sans selection:bg-cyan-300 selection:text-black">
            <HoverImageDisplay />

            <Hero />
            <Positioning />
            <Value />

            <section ref={worksSectionRef} id="works" className="min-h-screen flex items-center justify-end px-8 md:pl-[5vw] md:pr-[5vw] relative z-20 pointer-events-none mb-12">
                <div className="w-full relative h-full flex flex-col items-end justify-center">
                    <h2 className="absolute right-0 top-0 z-70 text-[11vw] md:text-[6vw] font-black leading-[0.83] tracking-tighter uppercase text-white text-right">
                        <span className="overlay-word inline-block will-change-[filter,opacity,transform]">STRUCTURED</span><br />
                        <span className="overlay-word inline-block will-change-[filter,opacity,transform] text-white/45">OUTCOMES.</span>
                    </h2>

                    <div className="flex flex-col items-end gap-12 w-full md:w-[70%] lg:w-[60%] mt-32 md:mt-48 pointer-events-auto z-95">
                        <div className="flex flex-col w-full">
                            {projects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/works/${project.slug}`}
                                    className="project-item group relative flex flex-col items-end py-8 border-b border-white/10 hover:border-white/50 transition-colors duration-300 cursor-none"
                                    onMouseEnter={() => useHoverStore.getState().setHoveredProject(project.id)}
                                    onMouseLeave={() => useHoverStore.getState().setHoveredProject(null)}
                                    onClick={() => useHoverStore.getState().setHoveredProject(null)}
                                >
                                    {/* PROJECT NAME (Gen-Z Slide Effect) */}
                                    <div className="relative z-10 flex items-baseline gap-4 group-hover:-translate-x-4 transition-transform duration-300 ease-out text-right">
                                        <span className="font-mono text-sm text-white/40 hidden md:inline-block">
                                            {project.id}
                                        </span>
                                        <h3 className="text-3xl md:text-5xl font-bold text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-l group-hover:from-[#FFD700] group-hover:to-[#00FFFF]">
                                            {project.name}
                                        </h3>
                                    </div>

                                    {/* CATEGORY */}
                                    <span className="relative z-10 font-mono text-xs md:text-sm text-white/50 mt-2 group-hover:-translate-x-4 transition-transform duration-300 delay-75">
                                        {`// ${project.category}`}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <TechStack />
            <ThinkingFramework />
            <Process />
            <Differentiation />
        </main>
    )
}
