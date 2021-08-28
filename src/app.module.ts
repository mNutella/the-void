import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from '@modules/profiles/profiles.module';
import { EpisodesModule } from '@modules/episodes/episodes.module';
import { configService } from '@config/config.service';
import { TagsModule } from '@modules/tags/tags.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    AutomapperModule.forRoot({
      options: [
        {
          name: 'classMapper',
          pluginInitializer: classes,
        },
      ],
      singular: true,
    }),
    ProfilesModule,
    EpisodesModule,
    TagsModule,
  ],
})
export class AppModule {}
