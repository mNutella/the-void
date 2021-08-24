import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { configService } from './config/config.service';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    ProfilesModule,
    EpisodesModule,
  ],
})
export class AppModule {}
