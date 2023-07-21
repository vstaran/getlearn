import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'

@Module({
    providers: [],
    controllers: [],
    exports: [],
    imports: [UserModule],
})
export class MemberModule {}
