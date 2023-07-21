import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../entities'

@ObjectType()
export class ItemUsers {
    @Field(() => [User])
    items: User[]

    @Field(() => Int)
    totalCount: number
}
