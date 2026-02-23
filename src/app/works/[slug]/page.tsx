'use client'

import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Clock, User, Calendar, Zap } from 'lucide-react'
import { use, useEffect, useRef, useState } from 'react'

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const project = projects.find((p) => p.slug === slug)

    const contentRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Tiny delay so CSS transitions fire on mount
        const t = setTimeout(() => setMounted(true), 50)
        return () => clearTimeout(t)
    }, [])

    if (!project) {
        notFound()
    }

    const accent = project.accentColor

    return (
        <main
            className="min-h-screen w-full relative overflow-x-hidden"
            style={{ background: '#000' }}
        >
            {/* ── Ambient glow background ── */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 60% -10%, ${accent}22 0%, transparent 70%)`,
                }}
            />
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(ellipse 40% 40% at 10% 110%, ${accent}15 0%, transparent 60%)`,
                }}
            />

            {/* ── Noise texture overlay ── */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                }}
            />

            <div
                ref={contentRef}
                className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-32"
                style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                }}
            >

                {/* ── Back Nav ── */}
                <div
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(-16px)',
                        transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
                    }}
                >
                    <Link
                        href="/#works"
                        className="inline-flex items-center gap-2 group mb-16 mt-4"
                        style={{ textDecoration: 'none' }}
                    >
                        <span
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-white/60 transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.04)' }}
                        >
                            <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-white group-hover:-translate-x-0.5 transition-all duration-300" />
                        </span>
                        <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-300">
                            Back to Works
                        </span>
                    </Link>
                </div>

                {/* ── Hero Header ── */}
                <div
                    className="mb-20 border-b pb-16"
                    style={{
                        borderColor: 'rgba(255,255,255,0.06)',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
                    }}
                >
                    {/* Protocol badge */}
                    <div className="flex items-center gap-3 mb-6">
                        <span
                            className="font-mono text-xs font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm"
                            style={{
                                background: `${accent}18`,
                                color: accent,
                                border: `1px solid ${accent}30`,
                            }}
                        >
                            // PROTOCOL_{project.id}
                        </span>
                        <span className="font-mono text-xs text-white/30 tracking-[0.15em] uppercase">
                            {project.category}
                        </span>
                    </div>

                    {/* Giant title */}
                    <h1
                        className="text-[clamp(3.5rem,12vw,9rem)] font-black uppercase leading-[0.82] tracking-tighter text-white mb-8"
                        style={{ fontFamily: 'inherit' }}
                    >
                        {project.name}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-white/40">
                            <User className="w-3.5 h-3.5" />
                            <span className="font-mono text-xs tracking-widest uppercase">{project.role}</span>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2 text-white/40">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-mono text-xs tracking-widest uppercase">{project.timeline}</span>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2 text-white/40">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-mono text-xs tracking-widest uppercase">{project.year}</span>
                        </div>
                    </div>
                </div>

                {/* ── Main Content Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-start">

                    {/* ── Left Column ── */}
                    <div className="flex flex-col gap-16">

                        {/* Project Image */}
                        <div
                            className="relative w-full overflow-hidden rounded-xl group"
                            style={{
                                aspectRatio: '16/9',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: `0 40px 80px -20px ${accent}30, 0 0 0 1px rgba(255,255,255,0.04)`,
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.98)',
                                transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
                            }}
                        >
                            {/* Scanline effect */}
                            <div
                                className="absolute inset-0 z-10 pointer-events-none"
                                style={{
                                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                                    opacity: 0.3,
                                }}
                            />
                            {/* Accent border glow on hover */}
                            <div
                                className="absolute inset-0 z-10 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{
                                    boxShadow: `inset 0 0 60px ${accent}20`,
                                    border: `1px solid ${accent}40`,
                                }}
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={project.img}
                                alt={project.name}
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                style={{ background: '#0a0a0a' }}
                            />
                            {/* Corner badge */}
                            <div
                                className="absolute top-4 left-4 z-20 font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-sm"
                                style={{
                                    background: 'rgba(0,0,0,0.7)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.5)',
                                }}
                            >
                                Preview
                            </div>
                            {project.status === 'building' ? (
                                <div
                                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-sm"
                                    style={{
                                        background: 'rgba(245,158,11,0.15)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(245,158,11,0.35)',
                                        color: '#F59E0B',
                                    }}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                                        style={{ background: '#F59E0B' }}
                                    />
                                    In Dev
                                </div>
                            ) : (
                                <div
                                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-sm"
                                    style={{
                                        background: `${accent}20`,
                                        backdropFilter: 'blur(8px)',
                                        border: `1px solid ${accent}40`,
                                        color: accent,
                                    }}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                                        style={{ background: accent }}
                                    />
                                    Live
                                </div>
                            )}
                        </div>

                        {/* ── Challenge ── */}
                        <div
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                                transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="w-6 h-px"
                                    style={{ background: accent }}
                                />
                                <span
                                    className="font-mono text-xs tracking-[0.2em] uppercase"
                                    style={{ color: accent }}
                                >
                                    The Challenge
                                </span>
                            </div>
                            <p className="text-white/60 text-lg leading-relaxed font-light" style={{ fontFamily: 'inherit' }}>
                                {project.challenge}
                            </p>
                        </div>

                        {/* ── Outcome ── */}
                        <div
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                                transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="w-6 h-px"
                                    style={{ background: '#10b981' }}
                                />
                                <span className="font-mono text-xs tracking-[0.2em] uppercase text-emerald-400">
                                    The Outcome
                                </span>
                            </div>
                            <p className="text-white/60 text-lg leading-relaxed font-light">
                                {project.outcome}
                            </p>
                        </div>

                        {/* ── Tech Stack ── */}
                        <div
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                                transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-6 h-px bg-white/20" />
                                <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/30">
                                    Tech Stack
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span
                                        key={t}
                                        className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 rounded-sm transition-all duration-300 hover:scale-105"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: 'rgba(255,255,255,0.55)',
                                            opacity: mounted ? 1 : 0,
                                            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
                                            transition: `opacity 0.4s ease ${0.65 + i * 0.05}s, transform 0.4s ease ${0.65 + i * 0.05}s`,
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right Sidebar ── */}
                    <div className="flex flex-col gap-6 lg:sticky lg:top-12">

                        {/* Project Brief Card */}
                        <div
                            className="rounded-xl p-8"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateX(0)' : 'translateX(24px)',
                                transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-1 h-6 rounded-full"
                                    style={{ background: accent }}
                                />
                                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                                    Project Brief
                                </h3>
                            </div>
                            <p className="text-white/55 text-sm leading-relaxed font-light font-mono">
                                {project.description}
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                border: '1px solid rgba(255,255,255,0.08)',
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateX(0)' : 'translateX(24px)',
                                transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s',
                            }}
                        >
                            <div
                                className="px-6 py-4"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5" style={{ color: accent }} />
                                    <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/40">
                                        Impact Metrics
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                {project.highlights.map((h, i) => (
                                    <div
                                        key={h.label}
                                        className="p-6 flex flex-col gap-2 transition-colors duration-300 hover:bg-white/[0.02]"
                                        style={{
                                            borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                            borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                            background: 'rgba(255,255,255,0.02)',
                                        }}
                                    >
                                        <span
                                            className="text-2xl font-black tracking-tight"
                                            style={{ color: accent }}
                                        >
                                            {h.value}
                                        </span>
                                        <span className="font-mono text-[10px] text-white/30 tracking-[0.15em] uppercase">
                                            {h.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status card */}
                        <div
                            className="rounded-xl px-6 py-5 flex items-center justify-between"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateX(0)' : 'translateX(24px)',
                                transition: 'opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s',
                            }}
                        >
                            <div className="flex items-center gap-2">
                                {project.status === 'building' ? (
                                    <>
                                        <span
                                            className="w-2 h-2 rounded-full animate-pulse"
                                            style={{ background: '#F59E0B' }}
                                        />
                                        <span className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: '#F59E0B' }}>
                                            Status: In Development
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className="w-2 h-2 rounded-full animate-pulse"
                                            style={{ background: '#10b981' }}
                                        />
                                        <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/40">
                                            Status: Live
                                        </span>
                                    </>
                                )}
                            </div>
                            <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/25">
                                {project.year}
                            </span>
                        </div>

                        {/* CTA Button */}
                        {project.status === 'building' ? (
                            <>
                                <div
                                    className="relative flex items-center justify-between w-full rounded-xl px-8 py-6 overflow-hidden"
                                    style={{
                                        background: 'rgba(245,158,11,0.08)',
                                        border: '1px solid rgba(245,158,11,0.25)',
                                        opacity: mounted ? 1 : 0,
                                        transform: mounted ? 'translateX(0)' : 'translateX(24px)',
                                        transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                                    }}
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-black uppercase tracking-[0.15em] text-sm" style={{ color: '#F59E0B' }}>
                                            Coming Soon
                                        </span>
                                        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                                            Currently in development
                                        </span>
                                    </div>
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
                                    >
                                        <span className="text-amber-400 text-xs">⏳</span>
                                    </div>
                                </div>
                                {/* Visit site button below coming soon */}
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-between w-full rounded-xl px-8 py-6 overflow-hidden"
                                    style={{
                                        background: accent,
                                        textDecoration: 'none',
                                        opacity: mounted ? 1 : 0,
                                        transform: mounted ? 'translateX(0)' : 'translateX(24px)',
                                        transition: 'opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s',
                                        boxShadow: `0 20px 40px ${accent}40`,
                                    }}
                                >
                                    {/* Shine sweep */}
                                    <div
                                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                        }}
                                    />
                                    <span className="font-black text-white uppercase tracking-[0.15em] text-sm relative z-10">
                                        Visit Live Site
                                    </span>
                                    <ExternalLink
                                        className="w-5 h-5 text-white relative z-10 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300"
                                    />
                                </a>
                            </>
                        ) : (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-between w-full rounded-xl px-8 py-6 overflow-hidden"
                                style={{
                                    background: accent,
                                    textDecoration: 'none',
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted ? 'translateX(0)' : 'translateX(24px)',
                                    transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                                    boxShadow: `0 20px 40px ${accent}40`,
                                }}
                            >
                                {/* Shine sweep */}
                                <div
                                    className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                    }}
                                />
                                <span className="font-black text-white uppercase tracking-[0.15em] text-sm relative z-10">
                                    Visit Live Site
                                </span>
                                <ExternalLink
                                    className="w-5 h-5 text-white relative z-10 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300"
                                />
                            </a>
                        )}

                        {/* Decorative footer text */}
                        <p className="font-mono text-[10px] text-white/15 tracking-[0.15em] uppercase text-center"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transition: 'opacity 0.5s ease 0.7s',
                            }}
                        >
                            // CONSOLE LOGS BY TEJA — {project.year}
                        </p>
                    </div>
                </div>

                {/* ── Bottom Rule ── */}
                <div
                    className="mt-32 flex items-center gap-4"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.8s',
                    }}
                >
                    <div
                        className="h-px flex-1"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
                    />
                    <span className="font-mono text-[10px] text-white/15 tracking-[0.2em] uppercase">
                        END OF FILE
                    </span>
                    <div
                        className="h-px flex-1"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
                    />
                </div>
            </div>
        </main>
    )
}
