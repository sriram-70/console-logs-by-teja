'use client'

import React from 'react'

interface MarqueeProps {
    children: React.ReactNode
    direction?: 'left' | 'right'
    speed?: number // seconds for one full loop
    className?: string
}

export function Marquee({ children, direction = 'left', speed = 20, className = '' }: MarqueeProps) {
    return (
        <div className={`flex overflow-hidden whitespace-nowrap mask-gradient ${className}`} style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}>
            <div
                className={`flex min-w-full gap-4 animate-marquee ${direction === 'right' ? 'animate-marquee-reverse' : ''}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
                {children}
                {children}
                {children}
            </div>
        </div>
    )
}
