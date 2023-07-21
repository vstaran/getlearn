import { PrismaClient } from '@prisma/client'

import { seedUsers } from './seeds/seedUser'

const prisma = new PrismaClient()

async function seed() {
    // User data
    await seedUsers()
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
