'use client'

import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function TechStack() {
    const sectionRef = useRef<HTMLElement>(null)
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    useGSAP(() => {
        const words = document.querySelectorAll('.ts-word')
        const section = sectionRef.current

        if (!section || words.length === 0) return

        gsap.fromTo(words, {
            opacity: 0,
            filter: 'blur(10px)',
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
                end: 'bottom 20%',
                toggleActions: 'play reverse play reverse'
            }
        })
    }, { scope: sectionRef })

    const audiences = [
        {
            id: '01',
            title: 'Event Organizers',
            desc: 'Pages designed to drive registrations and ticket sales.'
        },
        {
            id: '02',
            title: 'Startups',
            desc: 'Launch pages that explain your idea clearly and capture early traction.'
        },
        {
            id: '03',
            title: 'Product Businesses',
            desc: 'Focused experiences that highlight value and trigger action.'
        },
        {
            id: '04',
            title: 'Service Businesses',
            desc: 'Lead-driven structures built for clarity and trust.'
        }
    ]

    return (
        <section ref={sectionRef} id="tech-stack" className="min-h-screen w-full flex flex-col justify-center items-start px-8 md:pl-[8vw] relative z-20 pointer-events-none pt-24 md:pt-32 pb-16 mb-16 md:mb-24">

            {/* The global dimmer has been removed entirely for a seamless experience */}

            <div className="flex flex-col items-start gap-8 w-full md:w-[85%] lg:w-[70%] pointer-events-auto">

                {/* HEADER */}
                <h2 className="text-[11vw] md:text-[5vw] font-black leading-[0.85] tracking-[[-0.05em]] text-white uppercase mix-blend-difference pointer-events-none mb-2">
                    <span className="ts-word inline-block will-change-[filter,opacity,transform]">WHERE CLARITY</span><br />
                    <span className="ts-word inline-block text-white/40 will-change-[filter,opacity,transform]">MEETS GROWTH.</span>
                </h2>

                {/* 3D AUDIENCE GRID - Fitted to be visibly compact on one screen */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {audiences.map((item) => {
                        const isHovered = hoveredId === item.id;
                        return (
                            <div
                                key={item.id}
                                // Compact height to fit perfectly in viewport
                                className={`relative w-full h-[160px] md:h-[180px] cursor-none ${isHovered ? 'z-50' : 'z-10'}`}
                                style={{ perspective: '1200px' }}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* CUBE INNER - Now featuring curved edges (rounded-3xl) */}
                                <div
                                    className="relative w-full h-full rounded-2xl md:rounded-3xl"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transform: isHovered ? 'translateZ(-90px) rotateX(90deg)' : 'translateZ(-90px)',
                                        transition: isHovered ? 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.2)' : 'transform 0.2s ease-out'
                                    }}
                                >
                                    {/* FRONT FACE (Default) - Curved edges */}
                                    <div
                                        className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-8 bg-transparent border-none rounded-2xl md:rounded-3xl"
                                        style={{
                                            transform: 'rotateY(0deg) translateZ(90px)',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <span className="font-mono text-xs tracking-widest text-[#00F2FF] mb-1 opacity-80">{item.id} //</span>
                                            <h3 className="text-3xl md:text-4xl font-black text-white uppercase leading-[0.85] tracking-[[-0.05em]]">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* BOTTOM FACE (Revealed on Hover) - Curved edges */}
                                    <div
                                        className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-8 overflow-hidden rounded-2xl md:rounded-3xl"
                                        style={{
                                            transform: 'rotateX(-90deg) translateZ(90px)',
                                            backfaceVisibility: 'hidden',
                                            backgroundColor: 'rgba(0, 242, 255, 0.04)',
                                            border: '1px solid rgba(0, 242, 255, 0.15)',
                                            backdropFilter: 'blur(30px)',
                                            WebkitBackdropFilter: 'blur(30px)',
                                            /* Gentle corner glow fitting for curves */
                                            backgroundImage: 'radial-gradient(circle at top left, rgba(0, 242, 255, 0.4) 0%, transparent 40%)'
                                        }}
                                    >
                                        {/* Seamless Text Reveal without delay for a tighter response */}
                                        <div
                                            className={`flex flex-col w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-4 blur-sm'}`}
                                        >
                                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-[0.85] tracking-[[-0.04em]] mb-[8px]">
                                                {item.title}
                                            </h3>
                                            <p className="font-mono text-white/90 text-[0.85rem] md:text-[0.95rem] leading-relaxed max-w-[95%] tracking-[0.03em]">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
