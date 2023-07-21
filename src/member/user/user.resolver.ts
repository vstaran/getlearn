import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUserId, Roles } from '../../auth/decorators'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { ItemUsers } from './dto/item-users.response'

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User)
    async getMyProfile(@GetCurrentUserId() userId: number): Promise<User> {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }

    @Mutation(() => User)
    async editMyProfile(
        @GetCurrentUserId() userId: number,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ): Promise<User> {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return await this.userService.updateUser({ where: { id: userId }, data: updateUserInput })
    }

    @Roles('ADMIN')
    @Query(() => User)
    async getUserProfile(userId: number) {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }

    @Roles('ADMIN')
    @Mutation(() => User)
    async editUserProfile(userId: number, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return await this.userService.updateUser({ where: { id: userId }, data: updateUserInput })
    }

    @Roles('ADMIN')
    @Query(() => ItemUsers)
    async getAllUsers(
        @Args('search', { nullable: true }) search: string,
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
    ) {
        const where = search ? { OR: [{ title: { contains: search } }, { description: { contains: search } }] } : {}

        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }

        const [users, totalCount] = await Promise.all([
            this.userService.getUsers(where, orderBy, skip, take),
            this.userService.getTotalCount(where),
        ])

        return {
            items: users,
            totalCount,
        }
    }
}
