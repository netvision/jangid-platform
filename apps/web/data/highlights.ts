export interface HighlightProfile {
  name: string
  slug: string
  category: string
  summary: string
  accentColor: string
  description: string
  location: string
  services: string[]
  ctaLabel: string
  contact: {
    phone?: string
    email?: string
    website?: string
  }
}

export const highlightProfiles: HighlightProfile[] = [
  {
    name: 'Rakesh Furniture Works',
    category: 'Interior & Carpentry',
    slug: 'rakesh-furniture',
    summary: 'Bespoke woodwork crafted with premium teak and modular solutions.',
    accentColor: 'from-blue-500 to-indigo-500',
    description:
      'Rakesh Furniture Works has been crafting bespoke cabinetry and furniture for over two decades. Their studio combines traditional wood joinery with modern CNC precision to deliver premium results for homes and retail spaces alike.',
    location: 'Mumbai, Maharashtra',
    services: ['Modular kitchen design', 'Premium hardwood furniture', 'On-site polishing & restoration', '3D layout consultation'],
    ctaLabel: 'Request a furniture consultation',
    contact: {
      phone: '+91 98765 43210',
      email: 'hello@rakeshfurniture.com'
    }
  },
  {
    name: 'Meera Events Studio',
    category: 'Events & Decor',
    slug: 'meera-events',
    summary: 'Full-service event planning for weddings, cultural functions, and corporate meets.',
    accentColor: 'from-amber-500 to-orange-500',
    description:
      'Meera Events Studio curates immersive experiences for intimate celebrations and large-scale conferences alike. Their team handles design, vendor coordination, and logistics so hosts can fully enjoy the moment.',
    location: 'Jaipur, Rajasthan',
    services: ['Wedding planning', 'Corporate offsite experiences', 'Stage & decor design', 'Vendor and hospitality management'],
    ctaLabel: 'Plan your next event',
    contact: {
      phone: '+91 99887 65432',
      email: 'events@meerastudio.in',
      website: 'https://meerastudio.in'
    }
  },
  {
    name: 'Anshul Digital Prints',
    category: 'Printing & Branding',
    slug: 'anshul-digital',
    summary: 'Visiting cards, brochures, and signage delivered within 48 hours.',
    accentColor: 'from-emerald-500 to-teal-500',
    description:
      'Anshul Digital Prints provides end-to-end brand collateral services, from business cards and brochures to large-format signage. Their express delivery promise keeps marketing campaigns running on time.',
    location: 'Pune, Maharashtra',
    services: ['Express visiting cards', 'Brochure and catalogue design', 'Flex & vinyl boards', 'Bulk offset printing'],
    ctaLabel: 'Start a print order',
    contact: {
      phone: '+91 91234 55678',
      email: 'orders@anshuldigital.in'
    }
  }
]

export function findHighlightProfile(slug: string): HighlightProfile | undefined {
  return highlightProfiles.find((profile) => profile.slug === slug)
}
