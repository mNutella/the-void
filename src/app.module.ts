import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from '@modules/profiles/profiles.module';
import { EpisodesModule } from '@modules/episodes/episodes.module';
import { configService } from '@config/config.service';

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
