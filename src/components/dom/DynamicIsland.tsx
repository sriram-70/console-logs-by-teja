'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function DynamicIsland() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasEntered, setHasEntered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.8
            if (window.scrollY > heroHeight) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
                setHasEntered(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setHasEntered(true)
            }, 1800) // Slightly longer than total animation time
            return () => clearTimeout(timer)
        }
    }, [isVisible])

    const links = [
        { name: 'Services', href: '#services' },
        { name: 'Work', href: '#works' },
        { name: 'About', href: '#about' },
    ]

    const activeLinkName = hoveredLink

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: -100, width: 20, height: 20, borderRadius: 50, opacity: 0 }}
                animate={{
                    y: isVisible ? [
                        -100, // Start
                        0,    // Drop
                        -40,  // Bounce 1 Up
                        0     // Land
                    ] : -100,
                    x: isVisible ? [
                        0,    // Start
                        0,    // Wait for bounce
                        -130, // Roll Left
                        0     // Expand Correction (Left Anchor effect)
                    ] : 0,
                    rotate: isVisible ? [
                        0,
                        0,
                        -360, // Roll Spin
                        -360  // Stay Spun
                    ] : 0,
                    width: isVisible ? (isExpanded ? 600 : 280) : 20,
                    height: isVisible ? 55 : 20,
                    borderRadius: isVisible ? 24 : 50,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{
                    y: {
                        times: [0, 0.4, 0.7, 1], // 0.8s total duration for Y
                        duration: 0.8,
                        ease: "easeOut"
                    },
                    x: {
                        times: [0, 0.47, 0.76, 1], // 0.47=0.8s, 0.76=1.3s, 1=1.7s
                        duration: 1.7,
                        ease: "easeInOut"
                    },
                    rotate: {
                        times: [0, 0.47, 0.76, 1],
                        duration: 1.7,
                        ease: "easeInOut"
                    },
                    width: { delay: isVisible && !hasEntered ? 1.3 : 0, type: "spring", stiffness: 100, damping: 20 }, // Wait for roll (1.3s)
                    height: { delay: isVisible && !hasEntered ? 1.3 : 0, type: "spring", stiffness: 100, damping: 20 },
                    borderRadius: { delay: isVisible && !hasEntered ? 1.3 : 0, duration: 0.3 },
                    opacity: { duration: 0.2 }
                }}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`
                    pointer-events-auto
                    relative flex items-center justify-between
                    bg-black/90 backdrop-blur-md border border-white/10
                    shadow-2xl shadow-cyan-900/10
                    overflow-hidden
                    px-2
                `}
            >
                {/* CONTENT WRAPPER - Fades in AFTER expansion */}
                <motion.div
                    className="flex w-full items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: isVisible ? 1.5 : 0, duration: 0.3 }} // Wait for expansion
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
                </motion.div>
            </motion.nav>
        </div>
    )
}
