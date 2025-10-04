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
      description: 'Modular kitchens, wardrobes, bespoke furniture, and carpentry services.'
    },
    {
      name: 'Events & Decor',
      slug: 'events-decor',
      description: 'Wedding planners, stage designers, florists, and corporate event services.'
    },
    {
      name: 'Printing & Branding',
      slug: 'printing-branding',
      description: 'Digital printing, signage, promotional merchandise, and branding studios.'
    }
  ]

  await Promise.all(
    defaultCategories.map(async (category) => {
      await prisma.category.upsert({
        where: { slug: category.slug },
        create: category,
        update: category
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
          mode: SiteMode.CARD
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
