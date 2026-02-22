import { create } from 'zustand'

interface ScrollState {
    processProgress: number;
    isProcessActive: boolean;
    diagnosticProgress: number;
    isDiagnosticActive: boolean;
    diagnosticActivePoint: number;
    diagnosticPulseTick: number;
    setProcessProgress: (progress: number) => void;
    setIsProcessActive: (isActive: boolean) => void;
    setDiagnosticProgress: (progress: number) => void;
    setIsDiagnosticActive: (isActive: boolean) => void;
    setDiagnosticActivePoint: (point: number) => void;
    setDiagnosticPulseTick: (tick: number) => void;
    isThinkingActive: boolean;
    thinkingActiveStep: number;
    setIsThinkingActive: (isActive: boolean) => void;
    setThinkingActiveStep: (step: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
    processProgress: 0,
    isProcessActive: false,
    diagnosticProgress: 0,
    isDiagnosticActive: false,
    diagnosticActivePoint: 0,
    diagnosticPulseTick: 0,
    setProcessProgress: (progress) => set({ processProgress: progress }),
    setIsProcessActive: (isActive) => set({ isProcessActive: isActive }),
    setDiagnosticProgress: (progress) => set({ diagnosticProgress: progress }),
    setIsDiagnosticActive: (isActive) => set({ isDiagnosticActive: isActive }),
    setDiagnosticActivePoint: (point) => set({ diagnosticActivePoint: point }),
    setDiagnosticPulseTick: (tick) => set({ diagnosticPulseTick: tick }),
    isThinkingActive: false,
    thinkingActiveStep: 0,
    setIsThinkingActive: (isActive) => set({ isThinkingActive: isActive }),
    setThinkingActiveStep: (step) => set({ thinkingActiveStep: step }),
}))
