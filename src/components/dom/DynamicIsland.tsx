'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUI } from '@/context/UIContext'

export function DynamicIsland() {
    const { headerPosition } = useUI()
    const [isExpanded, setIsExpanded] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.8
            if (window.scrollY > heroHeight) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const [windowWidth, setWindowWidth] = useState(1200)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])



    const links = useMemo<{ name: string; href: string }[]>(() => [
        { name: 'Services', href: '#services' },
        { name: 'Work', href: '#works' },
        { name: 'Stack', href: '#tech-stack' },
        { name: 'Framework', href: '#thinking-framework' },
        { name: 'Process', href: '#process' },
        { name: 'Edge', href: '#differentiation' },
    ], [])

    const [activeSection, setActiveSection] = useState<string | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'contact' || entry.target.id === 'positioning') {
                        setActiveSection(null)
                    } else {
                        const link = links.find(l => l.href.substring(1) === entry.target.id)
                        if (link) setActiveSection(link.name)
                    }
                }
            })
        }, {
            rootMargin: '-20% 0px -60% 0px' // Trigger when section is in the top/middle of the viewport
        })

        links.forEach(link => {
            const el = document.getElementById(link.href.substring(1))
            if (el) observer.observe(el)
        })

        const contactEl = document.getElementById('contact')
        if (contactEl) observer.observe(contactEl)

        const positioningEl = document.getElementById('positioning')
        if (positioningEl) observer.observe(positioningEl)

        return () => observer.disconnect()
    }, [links])

    const activeLinkName = hoveredLink || activeSection

    const shouldShow = isVisible && headerPosition !== 'top-right'

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: -100, width: 20, height: 20, borderRadius: 50, opacity: 0 }}
                animate={{
                    y: shouldShow ? 0 : -100,
                    x: 0,
                    width: shouldShow ? (isExpanded ? Math.max(320, Math.min(windowWidth * 0.95, 800)) : 320) : 20,
                    height: shouldShow ? 55 : 20,
                    borderRadius: shouldShow ? 24 : 50,
                    opacity: shouldShow ? 1 : 0
                }}
                transition={{
                    y: {
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    },
                    x: {
                        duration: 0.5,
                        ease: "easeInOut"
                    },
                    width: { delay: shouldShow ? 0.3 : 0, type: "spring", stiffness: 100, damping: 20 },
                    height: { delay: shouldShow ? 0.3 : 0, type: "spring", stiffness: 100, damping: 20 },
                    borderRadius: { delay: shouldShow ? 0.3 : 0, duration: 0.3 },
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
                    animate={{ opacity: shouldShow ? 1 : 0 }}
                    transition={{ delay: shouldShow ? 0.5 : 0, duration: 0.3 }} // Reveal after drop/expand
                >
                    {/* LOGO AREA */}
                    <div className="flex items-center shrink-0 min-w-[120px]">
                        <a
                            href="#"
                            className="font-mono text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:text-cyan-400 transition-colors cursor-none whitespace-nowrap pl-4 pr-2 no-cursor-magnify relative flex items-center h-[30px]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={(!isExpanded && activeSection) ? activeSection : "logo"}
                                    initial={{ y: 8, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -8, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-4 whitespace-nowrap"
                                >
                                    {(!isExpanded && activeSection) ? (
                                        <span className="text-cyan-400">{activeSection}</span>
                                    ) : "Console Logs"}
                                </motion.span>
                            </AnimatePresence>
                            {/* Invisible dummy text to maintain dynamic width if needed, though width is currently fixed for the container logic */}
                            <span className="opacity-0 pointer-events-none whitespace-nowrap">
                                {(!isExpanded && activeSection) ? activeSection : "Console Logs"}
                            </span>
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
