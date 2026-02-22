'use client'

import { useState, useEffect } from 'react'
import { Scene } from '@/components/canvas/Scene'
import { Overlay } from '@/components/dom/Overlay'
import { Atmosphere } from '@/components/dom/Atmosphere'
import { Instagram, Github, Mail } from 'lucide-react'
import { useUI } from '@/context/UIContext'
import { useScrollStore } from '@/store/useScrollStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProcessBackgroundLayer } from '@/components/sections/Process'

export default function Home() {
  const [footerState, setFooterState] = useState('IDLE')
  const { setHeaderPosition } = useUI()

  // FORM STATE
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    budget: '',
    timeline: '',
    details: ''
  })

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
      // The 0.7-Second Delay before the Flash
      setTimeout(() => {
        setFooterState('FLASH');
      }, 700);
    }
  };

  const isProcessActive = useScrollStore((state) => state.isProcessActive) // Bind isProcessActive state

  // Use Locomotive Scroll for smooth scrolling
  useEffect(() => {
    let locomotiveScroll: any
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      locomotiveScroll = new LocomotiveScroll()
    })()

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy()
    }
  }, [])

  // Setup GSAP matchMedia for responsive animations outside R3F
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Setup hero exit animation - trigger when user scrolls down
      // Uses matchMedia to behave differently on mobile vs desktop
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          // Desktop hero text animation
        }
      })
    })

    return () => ctx.revert()
  }, [])


  return (
    <>
      <Atmosphere />
      {/* FORM BACKGROUND (Behind Scene) */}
      <div className={`fixed inset-0 bg-white z-[-1] transition-opacity duration-1000 ${['FLASH', 'FORM'].includes(footerState) ? 'opacity-100' : 'opacity-0'}`} />

      {/* NEW: Process Background Layer (Line & Dots). Has its own z-10 class natively. */}
      <ProcessBackgroundLayer />

      {/* R3F Canvas - Fixed explicitly at z-20 to sandwich between line and text. */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <Scene footerState={footerState} />
      </div>

      <div className="relative z-30">
        {/* Hide Overlay Content during Form */}
        <div
          className={`transition-opacity duration-500 ${footerState === 'FORM' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >  <Overlay />
        </div>

        <footer id="contact" className="min-h-screen relative flex flex-col justify-end items-center pb-0 z-10 overflow-hidden">

          {/* 1. SOCIALS OUTPOST (Top Right - Per Sketch) */}
          <div className={`absolute top-10 right-[5vw] flex flex-col items-end gap-6 z-30 transition-opacity duration-300 ${footerState === 'FORM' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {[
              { name: 'INSTAGRAM', icon: Instagram, url: 'https://instagram.com' },
              { name: 'GITHUB', icon: Github, url: 'https://github.com' },
              { name: 'MAIL', icon: Mail, url: 'mailto:hello@example.com' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-end gap-3 text-white mix-blend-overlay hover:mix-blend-normal hover:text-white transition-all duration-500 cursor-pointer"
              >
                {/* TEXT LABEL (Reveals on Hover) */}
                <span className="font-mono text-sm font-bold tracking-widest opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  {item.name}
                </span>

                {/* ICON (Rolls on Hover) */}
                <div className="relative transform transition-all duration-700 ease-out group-hover:rotate-[-360deg] group-hover:scale-110">
                  <item.icon size={24} />
                </div>
              </a>
            ))}
          </div>

          {/* 2. THE TRIGGER (Visible in IDLE/CHARGING/CRITICAL) */}
          <div className={`mb-[15vh] z-20 transition-all duration-500 flex flex-col items-center gap-8 ${['IDLE', 'CHARGING', 'CRITICAL'].includes(footerState) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            {/* New Lines */}
            <div className="text-center space-y-3">
              <p className="text-2xl md:text-3xl text-white font-medium tracking-wide">
                If It Matters, Let’s Build It Right.
              </p>
              <p className="text-lg md:text-xl text-white/50 font-mono">
                Built for businesses that care about clarity and results.
              </p>
            </div>

            <button
              className="group relative cursor-none"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              onClick={initiateLaunch}
              suppressHydrationWarning
            >
              <h2 className={`text-[12vw] font-black leading-none text-center transition-all duration-300 ${footerState === 'CRITICAL' ? 'text-[#FFD700] scale-110 animate-[shake_0.5s_ease-in-out_infinite]' : 'text-white mix-blend-overlay group-hover:text-[#ff3300] group-hover:mix-blend-normal group-hover:scale-105'}`}>
                START A<br />PROJECT
              </h2>
            </button>
          </div>

          {/* DEDICATED FLASH LAYER (Covers Scene initially) */}
          <div className={`fixed inset-0 bg-white z-60 pointer-events-none transition-opacity duration-500 ease-out ${footerState === 'FLASH' ? 'opacity-100' : 'opacity-0'}`} />

          {/* 3. THE FORM CONTAINER (Transparent - Content Only) */}
          <div className={`fixed inset-0 bg-transparent z-70 flex items-center justify-center transition-opacity duration-100 ease-linear overflow-y-auto ${['FLASH', 'FORM'].includes(footerState) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onTransitionEnd={() => { if (footerState === 'FLASH') { setFooterState('FORM'); setHeaderPosition('top-right'); } }}
          >

            {/* Form Container */}
            <div className={`w-full max-w-xl px-8 py-24 transition-all duration-700 ${footerState === 'FORM' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

              {/* Back Button */}
              {/* Back Button - Only visible on Step 1 */}
              <button
                onClick={() => { setFooterState('IDLE'); setHeaderPosition('center'); }}
                className={`mb-12 flex items-center gap-2 text-black/40 hover:text-black transition-all duration-300 font-mono text-sm uppercase cursor-pointer ${formStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                suppressHydrationWarning
              >
                ← Back
              </button>




              <form className="flex flex-col gap-6 mt-0 relative" onSubmit={(e) => {
                e.preventDefault();
                // Only submit if on step 2
                if (formStep === 2) {
                  setFooterState('BLACKOUT');
                  setHeaderPosition('center');
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                    setFooterState('IDLE');
                    setFormStep(1); // Reset form step
                    setFormData({ name: '', email: '', phone: '', type: '', budget: '', timeline: '', details: '' }); // Reset form data
                  }, 2500);
                }
              }}>

                {/* HEADER ROW: Title + Steps */}
                <div className="flex justify-between items-end mb-8 border-b-2 border-black/10 pb-4">
                  <h3 className="text-4xl md:text-5xl font-black text-black tracking-tighter m-0 leading-none uppercase">
                    {formStep === 1 ? 'YOUR DETAILS.' : 'PROJECT BRIEF.'}
                  </h3>

                  {/* Visual Step Indicator */}
                  <div className="flex gap-2 mb-1">
                    <div className={`h-1 w-8 rounded-full transition-all duration-300 ${formStep === 1 ? 'bg-black' : 'bg-black/20'}`} />
                    <div className={`h-1 w-8 rounded-full transition-all duration-300 ${formStep === 2 ? 'bg-black' : 'bg-black/20'}`} />
                  </div>
                </div>

                {/* STEP 1: IDENTITY */}
                <div suppressHydrationWarning className={`flex flex-col gap-6 transition-all duration-500 ease-in-out ${formStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute top-0 left-0 w-full pointer-events-none'}`}>
                  <input
                    suppressHydrationWarning
                    type="text"
                    placeholder="YOUR NAME"
                    required={formStep === 1}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl text-black font-bold outline-none focus:border-black transition-colors placeholder:text-black/20"
                  />
                  <input
                    suppressHydrationWarning
                    type="email"
                    placeholder="YOUR EMAIL"
                    required={formStep === 1}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl text-black font-bold outline-none focus:border-black transition-colors placeholder:text-black/20"
                  />
                  <input
                    suppressHydrationWarning
                    type="tel"
                    placeholder="PHONE NUMBER (OPTIONAL)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl text-black font-bold outline-none focus:border-black transition-colors placeholder:text-black/20"
                  />

                  <button
                    suppressHydrationWarning
                    type="button"
                    onClick={() => {
                      if (formData.name && formData.email && formData.email.includes('@')) {
                        setFormStep(2);
                      } else {
                        // Simple validation feedback
                        alert('Please fill in your name and a valid email to proceed.');
                      }
                    }}
                    className="mt-8 w-full bg-black text-white py-6 font-black text-xl uppercase tracking-wider hover:bg-violet-600 transition-colors cursor-none group relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:translate-x-2 transition-transform inline-block">NEXT STEP →</span>
                  </button>
                </div>

                {/* STEP 2: PROJECT SPECS */}
                <div suppressHydrationWarning className={`flex flex-col gap-6 transition-all duration-500 ease-in-out ${formStep === 2 ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full pointer-events-none'}`}>

                  {/* Project Type */}
                  <div className="relative">
                    <select
                      suppressHydrationWarning
                      required={formStep === 2}
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl text-black font-bold outline-none focus:border-black transition-colors appearance-none"
                    >
                      <option value="" disabled>PROJECT TYPE</option>
                      <option value="landing">Landing Page</option>
                      <option value="business">Business Website (Multi-page)</option>
                      <option value="portfolio">Portfolio Site</option>
                      <option value="event">Event Page</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">▼</div>
                  </div>



                  {/* Timeline */}
                  <div className="relative">
                    <select
                      suppressHydrationWarning
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl text-black font-bold outline-none focus:border-black transition-colors appearance-none"
                    >
                      <option value="" disabled>TIMELINE</option>
                      <option value="urgent">ASAP (Rush Fee)</option>
                      <option value="1week">1-2 Weeks</option>
                      <option value="2weeks">2-4 Weeks</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">▼</div>
                  </div>

                  {/* Project Details */}
                  <textarea
                    suppressHydrationWarning
                    placeholder="TELL ME ABOUT YOUR PROJECT"
                    rows={4}
                    required={formStep === 2}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 text-xl text-black font-bold outline-none focus:border-black transition-colors placeholder:text-black/20 resize-none"
                  />

                  <div className="flex gap-4 mt-4">
                    <button
                      suppressHydrationWarning
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="w-1/3 py-6 bg-white border-2 border-black text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      suppressHydrationWarning
                      type="submit"
                      className="w-2/3 bg-black text-white py-6 font-black text-xl uppercase tracking-wider hover:bg-violet-600 transition-colors cursor-none"
                    >
                      GET A QUOTE
                    </button>
                  </div>
                </div>
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
