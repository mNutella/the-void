import { ignore, mapWith } from '@automapper/core';
import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { UpdateProfileInput } from '@modules/profiles/dto/update-profile.input';
import { Profile } from '@modules/profiles/entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { CreateEpisodeInput } from './dto/create-episode.input';
import { EpisodeOutput } from './dto/episode.output';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(Episode, CreateEpisodeInput).forMember(
        (d) => d.accomplices,
        mapWith(Profile, UpdateProfileInput, (s) => s.accomplices),
      );
      mapper.createMap(Episode, UpdateEpisodeInput);
      mapper.createMap(Episode, EpisodeOutput);
      mapper
        .createMap(CreateEpisodeInput, Episode)
        .forMember((d) => d.id, ignore())
        .forMember(
          (d) => d.accomplices,
          mapWith(UpdateProfileInput, Profile, (s) => s.accomplices),
        );
      mapper.createMap(UpdateEpisodeInput, Episode);
      mapper.createMap(EpisodeOutput, Episode);
    };
  }
}
