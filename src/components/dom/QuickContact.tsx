'use client'

import { Instagram, Mail } from 'lucide-react'

export function QuickContact() {
    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
            {/* Instagram */}
            <a
                href="https://www.instagram.com/mycrafts.infinite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/20 text-white/60 hover:border-cyan-400 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 cursor-none"
                aria-label="Chat on Instagram"
            >
                <Instagram size={20} />
            </a>

            {/* Email */}
            <a
                href="mailto:tejasriramungarala@gmail.com"
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/20 text-white/60 hover:border-cyan-400 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 cursor-none"
                aria-label="Send Email"
            >
                <Mail size={20} />
            </a>
        </div>
    )
}
