import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

// Generate static routes for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative z-10 pt-32 pb-24">
            <div className="max-w-7xl w-full flex flex-col gap-12">

                {/* Nav & Header */}
                <div className="flex flex-col gap-8 border-b border-white/10 pb-8">
                    <Link href="/#works" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors w-max group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm tracking-widest uppercase font-bold">Back to Works</span>
                    </Link>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 text-sm md:text-base">
                            <span className="font-mono text-emerald-400 font-bold tracking-widest">
                        // PROTOCOL_{project.id}
                            </span>
                            <span className="font-mono text-white/40 uppercase tracking-widest">
                                {project.category}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                            {project.name}
                        </h1>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left: Project Imagery */}
                    <div className="aspect-video w-full bg-zinc-900 rounded-lg overflow-hidden border border-white/10 relative group shadow-2xl shadow-emerald-500/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={project.img}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    {/* Right: Details & CTA */}
                    <div className="flex flex-col gap-8 h-full justify-between">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wide border-l-4 border-emerald-500 pl-4">
                                Project Brief
                            </h3>
                            <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light font-mono">
                                {project.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                            <div className="flex items-center justify-between text-white/40 font-mono text-xs uppercase tracking-widest mb-2">
                                <span>Status: LIVE</span>
                                <span>Year: 2024</span>
                            </div>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between px-8 py-6 bg-white text-black font-black uppercase text-xl tracking-widest hover:bg-emerald-400 hover:text-black transition-all duration-300 w-full"
                            >
                                <span>Visit Live Site</span>
                                <ExternalLink className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}
