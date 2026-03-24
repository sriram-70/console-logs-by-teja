import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Great_Vibes } from 'next/font/google'
import './globals.css'
import { ClientLayout } from '@/components/dom/ClientLayout'
import { DynamicIsland } from '@/components/dom/DynamicIsland'
import { UIProvider } from '@/context/UIContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
})

// Signature font — used for the 'Developer Artist' climax text in Differentiation section
const signatureFont = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-signature',
})

const SITE_URL = 'https://consolelogs.in'
const SITE_NAME = 'CONSOLE LOGS by TEJA'
const SITE_DESCRIPTION =
  'Developer Artist based in Bengaluru crafting conversion-focused landing pages, portfolio sites, and digital experiences — Clear by Design, Designed to Convert.'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Developer Artist',
    'Bengaluru',
    'Web Design',
    'Landing Pages',
    'Portfolio',
    'Next.js',
    'Creative Developer',
    'Conversion Design',
    'Frontend Developer',
    'Teja',
    'Console Logs',
  ],
  authors: [{ name: 'Teja', url: SITE_URL }],
  creator: 'Teja',
  publisher: 'CONSOLE LOGS',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'CONSOLE LOGS by TEJA — Developer Artist, Bengaluru',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: '@consolelogs',
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace with actual code
  },
}

// JSON-LD Structured Data Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Teja',
      jobTitle: 'Developer Artist',
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/me.png`,
      sameAs: [
        'https://instagram.com/consolelogs',
        'https://github.com/consolelogs',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      knowsAbout: [
        'Web Development',
        'UI/UX Design',
        'Landing Pages',
        'Motion Design',
        'React',
        'Next.js',
        'Three.js',
        'GSAP',
        'Conversion Rate Optimization',
      ],
      knowsLanguage: ['en', 'te'],
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Conversion-Focused Web Development',
          description: 'Landing pages, portfolio sites, and digital experiences designed for clarity and results.',
        },
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}/#person`,
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'Professional portfolio and creative studio for conversion-focused web design and development.',
      provider: {
        '@id': `${SITE_URL}/#person`,
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 12.9716,
          longitude: 77.5946,
        },
        geoRadius: 'Global',
      },
      serviceType: [
        'Landing Page Design',
        'Portfolio Website',
        'Business Website',
        'Event Page',
        'Creative Development',
      ],
    },
  ],
}

export const viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${signatureFont.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T633MJ4T');
            `
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1JPTRPW3CC"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-1JPTRPW3CC');
            `
          }}
        />
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Mobile optimizations via native Next.js viewport handling above */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CONSOLE LOGS" />
        <meta name="format-detection" content="telephone=no" />
        {/* Geographic metadata */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T633MJ4T"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <UIProvider>
          <ClientLayout>
            <DynamicIsland />
            {children}
            {/* Grain texture overlay */}
            <div
              className="fixed inset-0 pointer-events-none opacity-[0.03] z-100 mix-blend-overlay"
              aria-hidden="true"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </ClientLayout>
        </UIProvider>
      </body>
    </html>
  )
}
