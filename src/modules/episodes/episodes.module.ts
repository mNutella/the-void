import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { EpisodesMapper } from './episodes.mapper';
import { EpisodesResolver } from './episodes.resolver';
import { EpisodesService } from './episodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode])],
  providers: [EpisodesMapper, EpisodesResolver, EpisodesService],
})
export class EpisodesModule {}
