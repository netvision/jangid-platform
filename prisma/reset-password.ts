import { PrismaClient } from '@prisma/client'
import { config as loadEnv } from 'dotenv'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load env vars from root
loadEnv({ path: resolve(__dirname, '../.env') })
loadEnv({ path: resolve(__dirname, '../.env.local'), override: true })

const prisma = new PrismaClient()

async function main() {
    const args = process.argv.slice(2)
    if (args.length < 2) {
        console.error('Usage: npx ts-node prisma/reset-password.ts <email> <new_password>')
        process.exit(1)
    }

    const [email, password] = args

    console.log(`Resetting password for user: ${email}`)

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        console.error(`User with email ${email} not found.`)
        process.exit(1)
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.user.update({
        where: { email },
        data: { passwordHash }
    })

    console.log(`Password for ${email} has been successfully reset.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
