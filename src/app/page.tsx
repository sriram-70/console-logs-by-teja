'use client'

import { useState, useEffect } from 'react'
import { Scene } from '@/components/canvas/Scene'
import { Overlay } from '@/components/dom/Overlay'
import { Atmosphere } from '@/components/dom/Atmosphere'

export default function Home() {
  const [footerState, setFooterState] = useState('IDLE')

  // HELPER: Handle Hover Logic safely (State Lock)
  const handleHoverStart = () => {
    if (footerState === 'IDLE') setFooterState('CHARGING');
  };
  const handleHoverEnd = () => {
    // DO NOT RESET if state is CRITICAL, FLASH, or FORM.
    if (footerState === 'CHARGING') setFooterState('IDLE');
  };

  // HELPER: Trigger the Launch Sequence
  const initiateLaunch = () => {
    if (footerState !== 'CRITICAL') {
      setFooterState('CRITICAL');
      // The 2-Second Delay before the Flash
      setTimeout(() => {
        setFooterState('FLASH');
      }, 2000);
    }
  };



  return (
    <>
      <Atmosphere />
      <div className="fixed inset-0 z-0">
        <Scene footerState={footerState} />
      </div>
      <div className="relative z-10">
        <Overlay />

        <footer id="contact" className="min-h-screen relative flex flex-col justify-end items-center pb-0 z-10 overflow-hidden">

          {/* 1. SOCIALS OUTPOST (Top Right - Per Sketch) */}
          <div className="absolute top-10 right-[5vw] flex flex-col items-end gap-2 z-30 mix-blend-darken">
            {['GITHUB', 'INSTAGRAM', 'MAIL'].map((social) => (
              <a key={social} href="#" className="font-mono text-xs font-bold text-black/60 hover:text-black transition-colors uppercase">
                {social} ↗
              </a>
            ))}
          </div>

          {/* 2. THE TRIGGER (Visible in IDLE/CHARGING/CRITICAL) */}
          <div className={`mb-[15vh] z-20 transition-all duration-500 ${['IDLE', 'CHARGING', 'CRITICAL'].includes(footerState) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              className="group relative cursor-none"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              onClick={initiateLaunch}
            >
              <h2 className={`text-[12vw] font-black leading-none text-center transition-all duration-300 ${footerState === 'CRITICAL' ? 'text-violet-600 scale-110 animate-[shake_0.5s_ease-in-out_infinite]' : 'text-white mix-blend-overlay group-hover:text-black group-hover:scale-105'}`}>
                MAKE AN<br />IMPACT
              </h2>
            </button>
          </div>


          {/* 3. THE FLASH & FORM (Solid White) */}
          <div className={`fixed inset-0 bg-white z-70 flex items-center justify-center transition-opacity duration-100 ease-linear ${['FLASH', 'FORM'].includes(footerState) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onTransitionEnd={() => { if (footerState === 'FLASH') setFooterState('FORM'); }}
          >

            {/* Form Container */}
            <div className={`w-full max-w-xl px-8 transition-all duration-700 ${footerState === 'FORM' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

              <button
                onClick={() => setFooterState('IDLE')}
                className="mb-12 flex items-center gap-2 text-black/40 hover:text-black transition-colors font-mono text-sm uppercase cursor-pointer"
              >
                ← Back
              </button>

              <h3 className="text-6xl font-black text-black mb-12 tracking-tighter">THE PROTOCOL.</h3>

              <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setFooterState('BLACKOUT'); setTimeout(() => { window.scrollTo(0, 0); setFooterState('IDLE'); }, 2500); }}>
                <input type="text" placeholder="NAME" className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl text-black font-bold outline-none focus:border-black transition-colors placeholder:text-black/20" />
                <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl text-black font-bold outline-none focus:border-black transition-colors placeholder:text-black/20" />
                <button type="submit" className="mt-8 w-full bg-black text-white py-6 font-black text-xl uppercase hover:bg-violet-600 transition-colors cursor-pointer">
                  ESTABLISH CONNECTION
                </button>
              </form>
            </div>
          </div>

          {/* 4. THE BLACKOUT (Solid Black) */}
          <div className={`fixed inset-0 bg-black z-70 flex items-center justify-center transition-opacity duration-300 ${footerState === 'BLACKOUT' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h2 className="text-4xl font-mono text-white animate-pulse">
              SYSTEM LINKED // THANK YOU
            </h2>
          </div>

        </footer>
      </div>
    </>
  )
}
