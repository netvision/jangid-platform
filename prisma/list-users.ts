import { PrismaClient } from '@prisma/client'
import { config as loadEnv } from 'dotenv'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

loadEnv({ path: resolve(__dirname, '../.env') })
loadEnv({ path: resolve(__dirname, '../.env.local'), override: true })

console.log('DATABASE_URL loaded:', process.env.DATABASE_URL ? 'Yes' : 'No')
if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL.substring(0, 15) + '...')
}

const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            role: true,
            profile: {
                select: {
                    displayName: true
                }
            }
        }
    })

    console.log('Found users:')
    users.forEach(user => {
        console.log(`- ${user.email} (${user.role}) - ${user.profile?.displayName || 'No Profile'}`)
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
