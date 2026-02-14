'use client'

import { useState, useEffect } from 'react'
import { Skills } from '@/components/sections/Skills'


export function Overlay() {
    const [loaded, setLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [activeProject, setActiveProject] = useState<string | null>(null)

    useEffect(() => {
        // Cinematic Intro Time
        const timer = setTimeout(() => {
            setLoaded(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {/* 0. CINEMATIC PRE-LOADER */}
            <div
                className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-2000 ease-in-out pointer-events-none ${loaded ? 'opacity-0' : 'opacity-100'}`}
            >
                <div className="relative flex flex-col items-center">
                    {/* The Beam of Light / Sunrise */}
                    <div className={`w-1 bg-white shadow-[0_0_100px_40px_rgba(255,255,255,0.8)] rounded-full transition-all duration-1500 ease-out ${loaded ? 'h-0 opacity-0' : 'h-64 opacity-100 animate-pulse'}`} />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-64 h-8 flex justify-center items-center">
                        <div className="text-[10px] font-mono text-white/40 tracking-[1em] uppercase animate-[ping_3s_ease-in-out_infinite]">
                            Initializing
                        </div>
                    </div>

                    {/* Horizontal horizon line expansion */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-white/50 shadow-[0_0_50px_10px_white] transition-all duration-1500 ease-out delay-500 ${loaded ? 'w-0 opacity-0' : 'w-96 opacity-100'}`} />
                </div>
            </div>

            <main className="w-full text-white font-sans selection:bg-cyan-300 selection:text-black">

                {/* 1. HERO (Center) */}
                <section className="h-screen w-full flex flex-col items-center justify-center p-8 relative">
                    <div className="absolute top-8 left-8 text-xs font-mono opacity-50 tracking-widest">
                        v.2026.1 // SYSTEM_READY
                    </div>
                    {/* HERO TITLE GRID LOCK-UP */}
                    <div className="flex flex-col items-start w-max z-10 mix-blend-exclusion select-none cursor-default">

                        {/* ROW 1: THE ROOF (Defines block width) */}
                        <h1 className="text-[15vw] font-black leading-[0.75] tracking-tighter text-white uppercase">
                            CONSOLE
                        </h1>

                        {/* ROW 2: THE BASE (Fills width) */}
                        <div className="flex flex-row items-start justify-between w-full mt-[-1vw]">
                            {/* LEFT PILLAR */}
                            <h1 className="text-[15vw] font-black leading-[0.75] tracking-tighter text-white uppercase">
                                LOGS
                            </h1>

                            {/* RIGHT PILLAR (Signature + Interaction) */}
                            <div className="flex flex-row items-baseline gap-2 md:gap-4 mt-[1vw] relative">
                                <span className="font-mono text-[2vw] text-white/80 lowercase">
                                    by
                                </span>

                                {/* THE TRIGGER */}
                                <div
                                    className="relative cursor-pointer group"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <span className="font-sans text-[4vw] font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                                        TEJA
                                    </span>

                                    {/* THE POP-UP IMAGE */}
                                    {isHovered && (
                                        <div className="absolute bottom-full right-0 mb-4 w-[200px] h-[250px] bg-white rounded-lg overflow-hidden border-2 border-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none z-50">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/me.jpeg" alt="Teja" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Value Proposition for Landing Pages */}
                    <div className="mt-12 text-center max-w-3xl z-10">
                        <p className="text-2xl md:text-3xl text-white/90 font-bold uppercase tracking-wide mb-4">
                            High-Converting Landing Pages & Business Websites
                        </p>
                        <p className="text-base md:text-lg text-white/60 font-mono uppercase tracking-wider mb-8">
                            Fast delivery • modern interactions • mobile first design
                        </p>

                        {/* Dual CTAs */}
                        <div className="flex gap-4 justify-center flex-wrap">
                            <a href="#contact" className="px-8 py-4 bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-none">
                                Get a Quote →
                            </a>
                            <a href="#works" className="px-8 py-4 border-2 border-white text-white font-black uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 cursor-none">
                                View Projects
                            </a>
                        </div>

                        {/* Quick Stats */}

                    </div>

                    <div className="absolute bottom-12 animate-bounce">
                        <p className="text-xs uppercase tracking-[0.3em]">Scroll to Initialize</p>
                    </div>
                </section>

                {/* 2. ABOUT: Here’s a bit about me + What I bring to the table */}
                {/* 2. ABOUT: Here’s a bit about me + What I bring to the table */}
                <section id="about" className="min-h-screen mb-32 flex items-center justify-start px-8 md:pl-[5vw] md:pr-[5vw] relative z-10 pointer-events-none">
                    <div className="flex flex-col items-start gap-8 w-full md:w-3/5 pointer-events-auto">

                        {/* HEADER */}
                        <h2 className="text-[14vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference">
                            DIGITAL<br />
                            <span className="text-white/40">ALCHEMY</span>
                        </h2>

                        {/* LOG BODY */}
                        <div className="flex flex-col gap-6 pl-4 md:pl-8 border-l-2 border-emerald-500/20">

                            {/* THE BRACKET TERMINAL */}
                            <div className="flex items-center gap-2 mb-4 font-mono text-sm tracking-widest text-emerald-500">
                                <span className="text-white/30">[</span>
                                <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                                    MISSION_PROFILE
                                </span>
                                <span className="animate-pulse text-emerald-400">_</span>
                                <span className="text-white/30">]</span>
                            </div>

                            {/* PUNCHLINE */}
                            <p className="text-3xl md:text-5xl font-medium text-white leading-tight">
                                I build websites that get you customers, not just compliments.
                            </p>

                            {/* IDENTITY */}
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-xl">
                                Specialized in <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FFD700] to-[#00FFFF]">Landing Pages</span> and <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FFD700] to-[#00FFFF]">Business Websites</span> that convert.
                            </p>

                            {/* DESCRIPTION */}
                            <div className="flex flex-col gap-3 mt-2 font-mono text-xs md:text-base text-white/60 leading-relaxed">
                                <p>&gt; Perfect for small businesses, events, and quick-turnaround projects</p>
                                <p>&gt; Modern design with interactive elements that make you stand out</p>
                                <p>&gt; Fast delivery (1-2 weeks) without compromising quality</p>
                                <p>&gt; Mobile-first, SEO-ready, conversion-optimized</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. SERVICES: What I bring to the table */}
                {/* 3. SERVICES: What I bring to the table */}
                <section id="services" className="min-h-screen mb-32 flex items-center justify-start px-8 md:pl-[5vw] md:pr-[5vw] relative z-10 pointer-events-none">

                    {/* CONTAINER */}
                    <div className="flex flex-col items-start gap-12 w-full md:w-3/4 pointer-events-auto">

                        {/* HEADER */}
                        <div className="text-left mb-4">
                            <h2 className="text-[14vw] md:text-[7vw] font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference">
                                WHAT I<br />
                                <span className="text-white/40">BRING_TO_TABLE</span>
                            </h2>
                        </div>

                        {/* COLLAGE GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">

                            {/* ROW 1 */}
                            {[
                                {
                                    id: '01',
                                    title: 'LANDING PAGES',
                                    stack: ['Next.js', 'Tailwind', 'Fast Delivery'],
                                    desc: '// High-converting pages for products, services, events',
                                    size: 'md:col-span-2'
                                },
                                {
                                    id: '02',
                                    title: 'BUSINESS WEBSITES',
                                    stack: ['Multi-page', 'SEO-Ready', 'Mobile-First'],
                                    desc: '// Professional sites for small businesses & startups',
                                    size: 'md:col-span-3'
                                }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    className={`${item.size} group relative flex flex-col justify-between p-6 md:p-8 bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 text-left cursor-none`}
                                    type="button"
                                    suppressHydrationWarning
                                >

                                    {/* TOP: ID & ARROW */}
                                    <div className="flex justify-between items-start w-full mb-8">
                                        <span className="font-mono text-cyan-400 text-sm font-bold">{item.id}</span>
                                        <span className="opacity-0 group-hover:opacity-100 text-cyan-400 text-xl transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                            🡥
                                        </span>
                                    </div>

                                    {/* MIDDLE: TITLE */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase leading-none mb-4 group-hover:text-cyan-300 transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* BOTTOM: STACK & DESC */}
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-2">
                                            {item.stack.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 text-xs font-mono text-white font-semibold bg-white/10 border border-white/10 group-hover:border-cyan-400/30 group-hover:text-cyan-100 transition-colors">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        {/* High Visibility Description */}
                                        <span className="font-mono text-sm text-emerald-400 font-medium mt-1">
                                            {item.desc}
                                        </span>
                                    </div>
                                </button>
                            ))}

                            {/* ROW 2 */}
                            {[
                                {
                                    id: '03',
                                    title: 'PORTFOLIO SITES',
                                    stack: ['Modern Design', 'Interactive', 'Showcase'],
                                    desc: '// Stand out with premium portfolio websites',
                                    size: 'md:col-span-3'
                                },
                                {
                                    id: '04',
                                    title: 'INTERACTIVE ELEMENTS',
                                    stack: ['Three.js', '3D Graphics', 'Animations'],
                                    desc: '// Add wow-factor with 3D and interactive features',
                                    size: 'md:col-span-2'
                                }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    className={`${item.size} group relative flex flex-col justify-between p-6 md:p-8 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all duration-300 rounded-lg text-left cursor-none`}
                                    type="button"
                                    suppressHydrationWarning
                                >

                                    <div className="flex justify-between items-start w-full mb-8">
                                        <span className="font-mono text-emerald-500 text-sm font-bold">{item.id}</span>
                                        <span className="opacity-0 group-hover:opacity-100 text-emerald-400 text-xl transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                            🡥
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase leading-none mb-4 group-hover:text-emerald-300 transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-2">
                                            {item.stack.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 text-xs font-mono text-white font-semibold bg-white/10 rounded border border-white/10 group-hover:border-emerald-500/30 group-hover:text-emerald-100 transition-colors">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="font-mono text-sm text-emerald-400 font-medium mt-1">
                                            {item.desc}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. WORKS: Take a look at my works */}
                {/* 4. WORKS: Take a look at my works */}
                <section id="works" className="min-h-screen mb-32 flex items-center justify-end px-8 md:pl-[5vw] md:pr-[5vw] relative z-10 pointer-events-none">

                    {/* CONTAINER: Aligned Right */}
                    <div className="flex flex-col items-end gap-12 w-full md:w-3/5 pointer-events-auto">

                        {/* HEADER */}
                        <div className="text-right">
                            <h2 className="text-[14vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference">
                                SELECTED<br />
                                <span className="text-white/40">_WORKS</span>
                            </h2>
                        </div>

                        {/* PROJECT LIST */}
                        <div className="flex flex-col w-full">
                            {[
                                {
                                    id: '01',
                                    name: 'HOUSE OF FESTIVALS',
                                    category: 'Event Landing Page',
                                    url: 'https://www.houseoffestivals.co.in/',
                                    img: '/houseoffestivals.co.in.png'
                                },
                                {
                                    id: '02',
                                    name: 'TOURNEY PLUS',
                                    category: 'SaaS Marketing Site',
                                    url: 'https://www.tourneyplus.xyz/',
                                    img: '/tourneyplus.xyz.png'
                                },
                                {
                                    id: '03',
                                    name: 'GK FINANCE',
                                    category: 'Fintech Landing Page',
                                    url: 'https://gkfinance.cloud/',
                                    img: '/gkfinance.cloud.png'
                                }
                            ].map((project) => (
                                <a
                                    key={project.id}
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex flex-col items-end py-8 border-b border-white/10 hover:border-white/50 transition-colors duration-300 cursor-none"
                                    onMouseEnter={() => setActiveProject(project.id)}
                                    onMouseLeave={() => setActiveProject(null)}
                                >
                                    {/* HOVER REVEAL IMAGE (Floating Left of List) */}
                                    {activeProject === project.id && (
                                        <div className="absolute right-[110%] top-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[400px] md:h-[250px] bg-zinc-900 rounded-lg overflow-hidden border border-white/20 shadow-2xl pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-200 origin-right hidden md:block">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={project.img} alt={project.name} className="w-full h-full object-cover" />

                                            {/* Overlay to dim image slightly */}
                                            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                                        </div>
                                    )}

                                    {/* PROJECT NAME (Gen-Z Slide Effect) */}
                                    <div className="flex items-baseline gap-4 group-hover:-translate-x-4 transition-transform duration-300 ease-out text-right">
                                        <span className="font-mono text-sm text-white/40 hidden md:inline-block">
                                            {project.id}
                                        </span>
                                        <h3 className="text-3xl md:text-5xl font-bold text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-l group-hover:from-[#FFD700] group-hover:to-[#00FFFF]">
                                            {project.name}
                                        </h3>
                                    </div>

                                    {/* CATEGORY */}
                                    <span className="font-mono text-xs md:text-sm text-white/50 mt-2 group-hover:-translate-x-4 transition-transform duration-300 delay-75">
                                        // {project.category}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. EXPERIENCE: The path I’ve taken */}
                {/* 5. EXPERIENCE: The path I’ve taken */}
                <section className="min-h-screen mb-32 flex items-center justify-start px-8 md:pl-[5vw] md:pr-[5vw] relative z-10 pointer-events-none">
                    <Skills />
                </section>

                {/* 6. TESTIMONIALS: Feedback that inspires */}
                {/* <section className="min-h-[50vh] flex items-center justify-center relative z-10 pointer-events-none">
                    <Testimonials />
                </section> */}

            </main>
        </>
    )
}
