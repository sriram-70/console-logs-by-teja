'use client'

export function Experience() {
    const experiences = [
        { role: 'Senior UX/UI Designer', company: 'TechCorp', period: '2023 - Present' },
        { role: 'Lead Product Designer', company: 'InnovateX', period: '2021 - 2023' },
        { role: 'UX Designer', company: 'Creative Solutions', period: '2019 - 2021' },
        { role: 'Interactive UI Designer', company: 'WebFlow Studio', period: '2018 - 2019' },
        { role: 'Interaction Designer', company: 'Freelance', period: '2016 - 2018' },
        { role: 'Design System Architect', company: 'StartupInc', period: '2015 - 2016' },
    ]

    return (
        <section className="w-full pointer-events-auto">
            <h2 className="text-[10vw] font-black leading-none text-white uppercase opacity-20 mb-12">
                Experience
            </h2>
            <div className="flex flex-col border-t border-white/20">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-white/20 hover:bg-white/5 transition-colors duration-300 px-4 cursor-none"
                    >
                        <h3 className="text-2xl md:text-4xl font-bold text-white uppercase mb-2 md:mb-0 group-hover:text-cyan-400 transition-colors">
                            {exp.role}
                        </h3>
                        <div className="flex items-center gap-4 text-white/60 font-mono">
                            <span>{exp.company}</span>
                            <span>//</span>
                            <span>{exp.period}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
