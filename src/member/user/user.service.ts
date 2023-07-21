import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        })
    }

    async getUserById(id: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id: id },
        })
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { email: email } })
    }

    async getUsers(where: any, orderBy: any, skip: number, take: number): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            where,
            orderBy,
            skip: skip || 0,
            take: take || 10,
        })

        return users
    }

    async getTotalCount(where: any): Promise<number> {
        return this.prisma.user.count({
            where,
        })
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({
            data,
        })
    }

    async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
        const { where, data } = params
        return await this.prisma.user.update({
            data,
            where,
        })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return await this.prisma.user.delete({
            where,
        })
    }
}
