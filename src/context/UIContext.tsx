'use client'

import { createContext, useContext, useState } from 'react'

type HeaderPosition = 'center' | 'top-right'

interface UIContextType {
    headerPosition: HeaderPosition
    setHeaderPosition: (position: HeaderPosition) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [headerPosition, setHeaderPosition] = useState<HeaderPosition>('center')

    return (
        <UIContext.Provider value={{ headerPosition, setHeaderPosition }}>
            {children}
        </UIContext.Provider>
    )
}

export function useUI() {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider')
    }
    return context
}
