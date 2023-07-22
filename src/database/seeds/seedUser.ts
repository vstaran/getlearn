import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function seedUsers() {
    for (let i = 0; i < 1; i++) {
        const password = await bcrypt.hash('qq11ww22ee', 10)
        await prisma.user.create({
            data: {
                username: 'Banana',
                email: faker.internet.email(),
                role: 'ADMIN',
                hashedPassword: password,
                closedAt: '2025-10-11T00:00:00.000Z',
            },
        })
    }
    console.log('Seed Users completed.')
}
