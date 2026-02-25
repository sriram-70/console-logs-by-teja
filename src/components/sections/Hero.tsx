'use client'

import { useState } from 'react'
import Image from 'next/image'

// Lightweight hover portrait — lazy image via Next/Image loading="lazy"
function HoverPortrait({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="absolute top-full right-0 mt-4 w-[200px] sm:w-[250px] h-auto bg-white rounded-lg overflow-hidden border-2 border-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none z-50">
            <Image
                src={src}
                alt={alt}
                width={250}
                height={300}
                quality={85}
                sizes="(max-width: 640px) 200px, 250px"
                className="w-full h-auto object-contain -mb-6"
                loading="lazy"
            />
        </div>
    )
}

export function Hero() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section
            id="hero"
            className="h-screen w-full flex flex-col items-center justify-between relative cursor-none overflow-hidden"
            style={{ padding: 'max(1.5rem, env(safe-area-inset-top, 1.5rem)) 1.5rem 1.5rem', paddingInline: 'clamp(1.5rem, 3vw, 3rem)' }}
            aria-label="Hero section"
        >
            {/* TOP BAR */}
            <div
                className="w-full flex justify-between items-start z-10 text-xs font-mono tracking-widest"
                style={{ opacity: 0.6 }}
                aria-hidden="true"
            >
                <span className="text-white/80">v.2026.1 // SYSTEM_READY</span>
            </div>

            {/* MAIN CONTENT CENTER */}
            <div className="flex-1 flex flex-col justify-center w-full z-10 select-none px-2 md:px-0">

                {/* HERO TITLE LOCK-UP */}
                <div className="flex flex-col w-fit mx-auto relative">

                    {/* TAGLINE ABOVE CONSOLE */}
                    <div className="w-full flex justify-start items-end mb-[-1.5vw] z-20">
                        <p className="text-sm md:text-xl text-white/70 font-medium tracking-wide text-left">
                            Clear by Design. Designed to Convert.
                        </p>
                    </div>

                    {/* ROW 1: CONSOLE — single H1 on page */}
                    <h1
                        className="font-black leading-[0.78] text-white uppercase text-left whitespace-nowrap"
                        style={{
                            fontSize: 'var(--fluid-hero)',
                            letterSpacing: '-0.05em',
                            textShadow: '0px 4px 20px rgba(0,0,0,0.15)',
                        }}
                    >
                        CONSOLE
                    </h1>

                    {/* ROW 2: LOGS + by TEJA */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start mt-0 gap-0">
                        {/* LOGS — visually part of the H1 lockup but aria hidden to keep a single H1 */}
                        <span
                            className="font-black leading-[0.78] text-white uppercase"
                            aria-hidden="true"
                            style={{
                                fontSize: 'var(--fluid-hero)',
                                letterSpacing: '-0.05em',
                                textShadow: '0px 4px 20px rgba(0,0,0,0.15)',
                            }}
                        >
                            LOGS
                        </span>

                        <div className="flex flex-col items-start sm:items-end mt-1 sm:mt-[-0.5vw] relative z-20">
                            <div className="flex flex-row items-baseline gap-2 md:gap-3 relative">
                                <span className="font-mono text-base md:text-3xl text-white lowercase italic">by</span>
                                <div
                                    className="relative cursor-none group"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <span
                                        className="font-sans font-bold text-white uppercase tracking-tight leading-none group-hover:text-cyan-400 transition-colors duration-300"
                                        style={{
                                            fontSize: 'clamp(2rem, 6vw, 6rem)',
                                            letterSpacing: '-0.03em',
                                            textShadow: '0px 4px 20px rgba(0,0,0,0.15)',
                                        }}
                                    >
                                        TEJA
                                    </span>

                                    {/* Hover portrait — lazy-loaded image doesn't block initial render */}
                                    {isHovered && (
                                        <HoverPortrait src="/me.png" alt="Photo of Teja, Developer Artist based in Bengaluru" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* VALUE PROPOSITION */}
                <div className="mt-10 md:mt-16 text-center max-w-3xl mx-auto px-4 flex flex-col gap-6">
                    <p
                        className="text-white/80 font-medium leading-relaxed"
                        style={{ fontSize: 'var(--fluid-body-lg)' }}
                    >
                        I craft{' '}
                        <strong className="font-bold" style={{ color: '#FFD700' }}>
                            conversion-focused
                        </strong>{' '}
                        landing pages for events, startups, and growing businesses — turning
                        attention into decisions.
                    </p>

                    {/* GLASSMORPHIC BADGES */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-2" role="list" aria-label="Core capabilities">
                        {['Clear Structure', 'Intentional Motion', 'Real Outcomes'].map((badge) => (
                            <span
                                key={badge}
                                role="listitem"
                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono uppercase text-white border border-cyan-400/20"
                                style={{
                                    fontSize: 'var(--fluid-caption)',
                                    background: 'rgba(34,211,238,0.08)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mt-8 md:mt-12 cursor-pointer pointer-events-auto w-full sm:w-auto px-4 sm:px-0">
                    <a
                        href="#contact"
                        className="w-full sm:w-auto text-center px-5 py-3 sm:px-8 sm:py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all duration-300 sm:hover:scale-105"
                        style={{ fontSize: 'var(--fluid-caption)' }}
                        aria-label="Get a project quote"
                    >
                        Get a Quote →
                    </a>
                    <a
                        href="#works"
                        className="w-full sm:w-auto text-center px-5 py-3 sm:px-8 sm:py-4 border-2 border-white/50 text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 sm:hover:scale-105"
                        style={{ fontSize: 'var(--fluid-caption)' }}
                        aria-label="View project work"
                    >
                        View Projects
                    </a>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div
                className="w-full flex justify-center items-end pb-4 font-mono text-white/30 tracking-[0.2em] uppercase animate-pulse"
                style={{ fontSize: 'var(--fluid-caption)' }}
                aria-label="Scroll to explore"
            >
                Scroll to Initialize
            </div>
        </section>
    )
}
