'use client'

import { useState } from 'react'

export function Hero() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section className="h-screen w-full flex flex-col items-center justify-between p-8 md:p-12 relative cursor-none overflow-hidden">

            {/* TOP BAR */}
            <div className="w-full flex justify-between items-start z-10 text-xs font-mono tracking-widest" style={{ opacity: 0.6 }}>
                <span className="text-white/80">v.2026.1 // SYSTEM_READY</span>
            </div>

            {/* MAIN CONTENT CENTER */}
            <div className="flex-1 flex flex-col justify-center w-full z-10 select-none px-4 md:px-0">

                {/* HERO TITLE LOCK-UP */}
                <div className="flex flex-col w-fit mx-auto relative">

                    {/* TAGLINE ABOVE CONSOLE */}
                    <div className="w-full flex justify-start items-end mb-[-1.5vw] z-20">
                        <span className="text-sm md:text-xl text-white/70 font-medium tracking-wide text-left">
                            Clear by Design. Designed to Convert.
                        </span>
                    </div>

                    {/* ROW 1: CONSOLE */}
                    <h1
                        className="text-[14vw] font-black leading-[0.78] text-white uppercase text-left whitespace-nowrap"
                        style={{ letterSpacing: '-0.05em', textShadow: '0px 4px 20px rgba(0,0,0,0.15)' }}
                    >
                        CONSOLE
                    </h1>

                    {/* ROW 2: LOGS + by TEJA */}
                    <div className="w-full flex justify-between items-start mt-0">
                        <h1
                            className="text-[14vw] font-black leading-[0.78] text-white uppercase"
                            style={{ letterSpacing: '-0.05em', textShadow: '0px 4px 20px rgba(0,0,0,0.15)' }}
                        >
                            LOGS
                        </h1>

                        <div className="flex flex-col items-end mt-[-0.5vw] relative z-20">
                            <div className="flex flex-row items-baseline gap-2 md:gap-3 relative">
                                <span className="font-mono text-lg md:text-3xl text-white lowercase italic">by</span>
                                <div
                                    className="relative cursor-none group"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <span
                                        className="font-sans text-[6vw] font-bold text-white uppercase tracking-tight leading-none group-hover:text-cyan-400 transition-colors duration-300"
                                        style={{ letterSpacing: '-0.03em', textShadow: '0px 4px 20px rgba(0,0,0,0.15)' }}
                                    >
                                        TEJA
                                    </span>
                                    {isHovered && (
                                        <div className="absolute top-full right-0 mt-4 w-[250px] h-auto bg-white rounded-lg overflow-hidden border-2 border-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none z-50">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/me.png" alt="Teja" className="w-full h-auto object-contain -mb-6" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* VALUE PROPOSITION */}
                <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto px-4 flex flex-col gap-6">
                    <p className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed">
                        I craft <span className="font-bold" style={{ color: '#FFD700' }}>conversion-focused</span> landing pages for events, startups, and growing businesses — turning attention into decisions.
                    </p>

                    {/* GLASSMORPHIC BADGES */}
                    <div className="flex flex-wrap gap-3 justify-center mt-2">
                        {['Clear Structure', 'Intentional Motion', 'Real Outcomes'].map((badge) => (
                            <span
                                key={badge}
                                className="px-4 py-2 rounded-full text-xs md:text-sm font-mono tracking-widest uppercase text-white border border-cyan-400/20"
                                style={{
                                    background: 'rgba(34,211,238,0.08)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                }}
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-4 md:gap-8 justify-center mt-8 md:mt-12 cursor-pointer pointer-events-auto">
                    <a href="#contact" className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-black uppercase text-xs md:text-sm tracking-widest hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105">
                        Get a Quote →
                    </a>
                    <a href="#works" className="px-6 py-3 md:px-8 md:py-4 border-2 border-white/50 text-white font-black uppercase text-xs md:text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                        View Projects
                    </a>
                </div>

            </div>

            {/* BOTTOM BAR */}
            <div className="w-full flex justify-center items-end pb-4 font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase animate-pulse">
                Scroll to Initialize
            </div>
        </section>
    )
}
