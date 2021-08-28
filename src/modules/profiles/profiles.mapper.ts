import { ignore, mapWith } from '@automapper/core';
import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ProfileOutput } from './dto/profile.output';
import { Profile } from './entities/profile.entity';
import { Episode } from '@modules/episodes/entities/episode.entity';
import { UpdateEpisodeInput } from '@modules/episodes/dto/update-episode.input';

@Injectable()
export class ProfilesMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(Profile, CreateProfileInput).forMember(
        (d) => d.episodes,
        mapWith(Episode, UpdateEpisodeInput, (s) => s.episodes),
      );
      mapper.createMap(Profile, UpdateProfileInput);
      mapper.createMap(Profile, ProfileOutput);
      mapper
        .createMap(CreateProfileInput, Profile)
        .forMember((d) => d.id, ignore())
        .forMember(
          (d) => d.episodes,
          mapWith(UpdateEpisodeInput, Episode, (s) => s.episodes),
        );
      mapper.createMap(UpdateProfileInput, Profile);
      mapper.createMap(ProfileOutput, Profile);
    };
  }
}
