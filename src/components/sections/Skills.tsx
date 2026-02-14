'use client'

export function Skills() {
    const skillCategories = [
        {
            category: 'Frontend',
            skills: ['TypeScript', 'React', 'Next.js', 'Three.js', 'Tailwind CSS', 'GSAP']
        },
        {
            category: 'Backend & Database',
            skills: ['Node.js', 'PostgreSQL', 'Supabase', 'REST APIs', 'WebSockets']
        },
        {
            category: 'Integrations',
            skills: ['Stripe Payments', 'Discord API', 'Email Services', 'Google Maps', 'Analytics']
        },
        {
            category: 'Specializations',
            skills: ['Landing Pages', 'Business Sites', 'Event Platforms', '3D Web Graphics']
        }
    ]

    return (
        <section className="w-full md:w-3/5 pointer-events-auto">
            <h2 className="text-[10vw] font-black leading-none text-white uppercase opacity-20 mb-12">
                Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((cat, index) => (
                    <div
                        key={index}
                        className="group p-8 bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors duration-300"
                    >
                        <h3 className="text-2xl font-bold text-cyan-400 uppercase mb-6 font-mono tracking-wider">
                            {cat.category}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {cat.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-white/10 text-white font-mono text-sm border border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-none"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
