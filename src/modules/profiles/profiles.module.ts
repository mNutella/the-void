import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { configService } from '@config/config.service';
import { AlgoliaModule } from '@modules/algolia/algolia.module';
import { AlgoliaService } from '@modules/algolia/algolia.service';

@Module({
  imports: [
    AlgoliaModule.register(configService.getAlgoliaConfig()),
    TypeOrmModule.forFeature([Profile]),
  ],
  providers: [AlgoliaService, ProfilesResolver, ProfilesService],
})
export class ProfilesModule {}
