import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'
import { PrismaClient, UserRole, ProfileStatus, SiteMode } from '@prisma/client'
import bcrypt from 'bcryptjs'

const envFiles = ['../.env', '../.env.local']

for (const file of envFiles) {
  const filePath = resolve(__dirname, file)
  if (existsSync(filePath)) {
    loadEnv({ path: filePath, override: true })
  }
}

const prisma = new PrismaClient()

async function main() {
  const defaultCategories = [
    {
      name: 'Interior & Carpentry',
      slug: 'interior-carpentry',
      description: 'Modular kitchens, wardrobes, bespoke furniture, and carpentry services.',
      isActive: true
    },
    {
      name: 'Events & Decor',
      slug: 'events-decor',
      description: 'Wedding planners, stage designers, florists, and corporate event services.',
      isActive: true
    },
    {
      name: 'Printing & Branding',
      slug: 'printing-branding',
      description: 'Digital printing, signage, promotional merchandise, and branding studios.',
      isActive: true
    }
  ]

  await Promise.all(
    defaultCategories.map(async (category) => {
      await prisma.category.upsert({
        where: { slug: category.slug },
        create: category,
        update: {
          name: category.name,
          description: category.description,
          isActive: category.isActive
        }
      })
    })
  )

  const defaultThemes = [
    {
      slug: 'classic-card',
      name: 'Classic Card',
      description: 'Elegant visiting-card layout with warm tones.',
      thumbnail: 'https://cdn.jangid.co.in/themes/classic-card.png',
      config: {
        palette: {
          options: ['warm', 'cool', 'neutral'],
          default: 'warm'
        },
        accentColor: {
          default: '#d97706'
        }
      }
    },
    {
      slug: 'modern-brochure',
      name: 'Modern Brochure',
      description: 'Wide hero layout with rich imagery and layered sections.',
      thumbnail: 'https://cdn.jangid.co.in/themes/modern-brochure.png',
      config: {
        palette: {
          options: ['ember', 'ocean', 'slate'],
          default: 'ember'
        },
        typography: {
          heading: 'Playfair Display',
          body: 'Work Sans'
        }
      }
    }
  ]

  await Promise.all(
    defaultThemes.map(async (theme) => {
      await prisma.theme.upsert({
        where: { slug: theme.slug },
        create: theme,
        update: {
          name: theme.name,
          description: theme.description,
          thumbnail: theme.thumbnail,
          config: theme.config,
          isActive: true
        }
      })
    })
  )

  const email = process.env.SUPER_ADMIN_EMAIL
  const password = process.env.SUPER_ADMIN_PASSWORD

  if (!email || !password) {
    console.warn('Skipping super admin seed: SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD not set')
    return
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.info('Super admin already exists')
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isApproved: true,
      profile: {
        create: {
          slug: 'super-admin',
          displayName: 'Super Admin',
          status: ProfileStatus.APPROVED,
          mode: SiteMode.CARD,
          theme: {
            connect: { slug: 'classic-card' }
          },
          themeConfig: {
            palette: 'warm',
            accentColor: '#d97706'
          }
        }
      }
    }
  })

  console.info('Super admin seeded successfully')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
