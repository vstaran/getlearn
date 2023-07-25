import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function seedUsers() {
    const password = await bcrypt.hash('qq11ww22ee', 10)
    await prisma.user.upsert({
        where: { email: 'banana@gmail.com' },
        create: {
            username: 'Banana',
            email: 'banana@gmail.com',
            role: 'ADMIN',
            hashedPassword: password,
        },
        update: {
            username: 'Banana', // Optionally, you can update other fields here if needed.
            role: 'ADMIN',
            hashedPassword: password,
        },
    })

    for (let i = 0; i < 30; i++) {
        await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                hashedPassword: password,
            },
        })
    }
    console.log('Seed Users completed.')
}
