import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    ProfilesModule,
  ],
})
export class AppModule {}
