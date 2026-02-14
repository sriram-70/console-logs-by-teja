'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function DynamicIsland() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)

    const links = [
        { name: 'Services', href: '#services' },
        { name: 'Work', href: '#works' },
        { name: 'About', href: '#about' },
    ]

    const activeLinkName = hoveredLink

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <nav
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`
                    pointer-events-auto
                    relative flex items-center justify-between
                    bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl
                    transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                    shadow-2xl shadow-cyan-900/10
                    overflow-hidden
                    ${isExpanded ? 'w-[600px] px-2 py-2' : 'w-[280px] px-2 py-2'}
                `}
            >
                {/* LOGO AREA */}
                <div className="flex items-center shrink-0">
                    <a
                        href="#"
                        className="font-mono text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:text-cyan-400 transition-colors cursor-none whitespace-nowrap pl-4 pr-2 no-cursor-magnify"
                    >
                        Console Logs
                    </a>
                </div>

                {/* EXPANDABLE MENU LINKS */}
                <div
                    className={`
                        absolute left-1/2 -translate-x-1/2 flex items-center gap-2
                        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                        ${isExpanded ? 'opacity-100 visible delay-100' : 'opacity-0 invisible delay-0'}
                    `}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            className="relative px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest cursor-none whitespace-nowrap z-10 no-cursor-magnify"
                        >
                            {/* TEXT */}
                            <span className={`relative z-20 transition-colors duration-200 ${activeLinkName === link.name ? 'text-black font-bold' : 'text-white/60'}`}>
                                {link.name}
                            </span>

                            {/* SLIDING PILL BACKGROUND */}
                            {activeLinkName === link.name && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-cyan-400 rounded-full z-10"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30
                                    }}
                                />
                            )}
                        </a>
                    ))}
                </div>

                {/* CTA BUTTON */}
                <div className="flex items-center shrink-0">
                    <a
                        href="#contact"
                        className={`
                            flex items-center justify-center
                            bg-white text-black font-black uppercase text-[11px] tracking-widest 
                            hover:bg-cyan-400 transition-all duration-300 cursor-none no-cursor-magnify
                            whitespace-nowrap rounded-full
                            px-4 py-2
                        `}
                    >
                        Get Quote
                    </a>
                </div>
            </nav>
        </div>
    )
}
