import { PrismaClient } from '@prisma/client'
import { seedAuctions } from './seeds/seedAuction'
import { seedAuctionBids } from './seeds/seedAuctionBids'
import { seedAuctionStatus } from './seeds/seedAuctionStatus'
import { seedNews } from './seeds/seedNews'
import { seedToken } from './seeds/seedToken'
import { seedTokenHistory } from './seeds/seedTokenHistory'
import { seedUsers } from './seeds/seedUser'

const prisma = new PrismaClient()

async function seed() {
    // User data
    await seedUsers()

    // Auction sata
    await seedAuctionStatus()
    await seedAuctions()
    await seedAuctionBids()

    // static data
    await seedNews()
    await seedToken()
    await seedTokenHistory()
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
