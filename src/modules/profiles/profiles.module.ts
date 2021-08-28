import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@config/config.service';
import { AlgoliaModule } from '@modules/algolia/algolia.module';
import { AlgoliaService } from '@modules/algolia/algolia.service';
import { ProfilesMapper } from './profiles.mapper';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [
    AlgoliaModule.register(configService.getAlgoliaConfig()),
    TypeOrmModule.forFeature([Profile]),
  ],
  providers: [ProfilesMapper, AlgoliaService, ProfilesResolver, ProfilesService],
})
export class ProfilesModule {}
