'use client'

import { useState, useEffect } from 'react'
import { Instagram, Mail, Github } from 'lucide-react'

export function StickyHeader() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="flex items-center justify-between px-8 py-4">
                <a href="#" className="font-mono text-white font-black uppercase tracking-[0.3em] text-sm hover:text-cyan-400 transition-colors cursor-none">
                    CONSOLE LOGS
                </a>

                <div className="flex items-center gap-6">
                    {/* Social Links */}
                    <a
                        href="https://www.instagram.com/mycrafts.infinite"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-cyan-400 transition-colors duration-300 cursor-none"
                        aria-label="Instagram"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href="https://github.com/sriram-70"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-cyan-400 transition-colors duration-300 cursor-none"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="mailto:tejasriramungarala@gmail.com"
                        className="text-white/40 hover:text-cyan-400 transition-colors duration-300 cursor-none"
                        aria-label="Email"
                    >
                        <Mail size={20} />
                    </a>

                    {/* CTA Button */}
                    <a
                        href="#contact"
                        className="px-6 py-2 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-cyan-400 transition-all duration-300 cursor-none"
                    >
                        Get Quote
                    </a>
                </div>
            </div>
        </header>
    )
}
