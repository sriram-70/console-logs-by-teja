'use client'

import { useState, useEffect } from 'react'

export function DynamicIsland() {
    const [isExpanded, setIsExpanded] = useState(false)

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
                    ${isExpanded ? 'w-[450px] px-2 py-2' : 'w-[280px] px-2 py-2'}
                `}
            >
                {/* LOGO AREA */}
                <div className="flex items-center shrink-0">
                    <a
                        href="#"
                        className="font-mono text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:text-cyan-400 transition-colors cursor-none whitespace-nowrap pl-4 pr-2"
                    >
                        Console Logs
                    </a>
                </div>

                {/* EXPANDABLE MENU LINKS */}
                <div
                    className={`
                        absolute left-1/2 -translate-x-1/2 flex items-center gap-6 
                        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                        ${isExpanded ? 'opacity-100 visible delay-100' : 'opacity-0 invisible delay-0'}
                    `}
                >
                    {[
                        { name: 'Services', href: '#services' },
                        { name: 'Work', href: '#works' },
                        { name: 'About', href: '#about' },
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-mono text-[10px] md:text-xs text-white/60 hover:text-cyan-400 uppercase tracking-widest transition-colors cursor-none whitespace-nowrap"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA BUTTON */}
                <div className="flex items-center shrink-0">
                    <a
                        href="#contact"
                        className={`
                            flex items-center justify-center
                            bg-white text-black font-black uppercase text-[9px] tracking-widest 
                            hover:bg-cyan-400 transition-all duration-300 cursor-none
                            whitespace-nowrap rounded-full
                            px-3 py-1.5
                        `}
                    >
                        Get Quote
                    </a>
                </div>
            </nav>
        </div>
    )
}
