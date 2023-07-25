import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AccessTokenGuard, RolesGuard } from './auth/guards'
import { PrismaService } from './database/prisma.service'
import { MailModule } from './mail/mail.module'
import { MailService } from './mail/mail.service'
import { MemberModule } from './member/member.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MemberModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/grachql-schema.gql'),
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        ScheduleModule.forRoot(),
        AuthModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        { provide: APP_GUARD, useClass: AccessTokenGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        MailService,
    ],
})
export class AppModule {}
