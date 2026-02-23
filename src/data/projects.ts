export type Project = {
    id: string
    slug: string
    name: string
    category: string
    url: string
    img: string
    description: string
    role: string
    timeline: string
    year: string
    status?: 'live' | 'building'
    tech: string[]
    highlights: { label: string; value: string }[]
    challenge: string
    outcome: string
    accentColor: string
}

export const projects: Project[] = [
    {
        id: '01',
        slug: 'house-of-festivals',
        name: 'HOUSE OF FESTIVALS',
        category: 'Event Website',
        url: 'https://www.houseoffestivals.co.in/',
        img: '/houseoffestivals.co.in.png',
        description: 'A high-energy event landing page designed to capture the excitement and scale of the festival. Features immersive visuals, smooth animations, and a clear conversion path for ticket sales.',
        role: 'Lead Designer & Developer',
        timeline: '3 weeks',
        year: '2025',
        status: 'live',
        tech: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
        highlights: [
            { label: 'Ticket CTR', value: '+340%' },
            { label: 'Bounce Rate', value: '−47%' },
            { label: 'Load Time', value: '< 1.2s' },
            { label: 'Mobile Score', value: '97/100' },
        ],
        challenge: 'The client needed a site that could match the raw energy of a live festival — something visceral, kinetic, and impossible to scroll past without stopping.',
        outcome: 'Delivered a fully animated, immersive landing page that drove a 340% increase in ticket click-through rate within the first week of launch.',
        accentColor: '#FF3366',
    },
    {
        id: '02',
        slug: 'tourney-plus',
        name: 'TOURNEY PLUS',
        category: 'SaaS Product for Esports Tournaments',
        url: 'https://www.tourneyplus.xyz/',
        img: '/tourneyplus.xyz.png',
        description: 'A modern SaaS platform built for competitive esports teams. Focuses on tournament management, scrim scheduling, and match analytics — all in one competitive-grade dashboard.',
        role: 'Full-Stack Designer',
        timeline: '6 weeks',
        year: '2025',
        status: 'building',
        tech: ['Next.js', 'Supabase', 'Discord OAuth', 'TypeScript', 'Prisma', 'Zeabur'],
        highlights: [
            { label: 'Auth Speed', value: '< 0.8s' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Modules Built', value: '5/8' },
            { label: 'Beta ETA', value: 'Q2 2025' },
        ],
        challenge: 'Esports audiences are highly skeptical of new platforms. The design had to instantly communicate trust, speed, and competitive-grade reliability — all above the fold.',
        outcome: 'Core tournament, scrims, and match modules are live in private beta. Full public launch targeting Q2 2025 with Discord OAuth as the zero-friction entry point.',
        accentColor: '#7C3AED',
    }
]
