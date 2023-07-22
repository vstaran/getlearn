import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function seedUsers() {
    for (let i = 0; i < 1; i++) {
        const password = await bcrypt.hash('qq11ww22ee', 10)
        await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                role: 'ADMIN',
                hashedPassword: password,
                closedAt: '',
            },
        })
    }
    console.log('Seed Users completed.')
}
