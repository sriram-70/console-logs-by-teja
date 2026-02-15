'use client'

import { useState, useEffect } from 'react'
import { Loader } from '@/components/dom/Loader'
import { Cursor } from '@/components/dom/Cursor'

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)

    // Check session storage on mount to skip loader if already visited
    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisited')
        if (hasVisited) {
            setLoading(false)
        }
    }, [])

    const handleLoaderComplete = () => {
        setLoading(false)
        sessionStorage.setItem('hasVisited', 'true')
    }

    return (
        <>
            {/* Loader with high z-index handles the entrance */}
            {loading && <Loader onComplete={handleLoaderComplete} />}

            {/* Main Site Content */}
            <main className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 delay-300'}>
                {/* Actually, user wants "reveal from corners" as the ball shrinks. 
              This implies content must be VISIBLE underneath the shrinking ball.
              So we should NOT hide the content with opacity-0.
              The Loader's black background covers it. 
              Then Loader background becomes transparent.
              Then Ball shrinks, revealing content.
          */}
                {children}
            </main>

            {/* Cursor takes over when loading is done */}
            {!loading && <Cursor />}
        </>
    )
}
