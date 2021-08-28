import { ignore, mapWith } from '@automapper/core';
import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { CreateTagInput } from '@modules/tags/dto/create-tag.input';
import { TagOutput } from '@modules/tags/dto/tag.output';
import { UpdateTagInput } from '@modules/tags/dto/update-tag.input';
import { Tag } from '@modules/tags/entities/tag.entity';
import { Episode } from '@modules/episodes/entities/episode.entity';
import { UpdateEpisodeInput } from '@modules/episodes/dto/update-episode.input';

@Injectable()
export class TagsMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(Tag, CreateTagInput).forMember(
        (d) => d.episodes,
        mapWith(Episode, UpdateEpisodeInput, (s) => s.episodes),
      );
      mapper.createMap(Tag, UpdateTagInput);
      mapper.createMap(Tag, TagOutput);
      mapper
        .createMap(CreateTagInput, Tag)
        .forMember((d) => d.id, ignore())
        .forMember(
          (d) => d.episodes,
          mapWith(UpdateEpisodeInput, Episode, (s) => s.episodes),
        );
      mapper.createMap(UpdateTagInput, Tag);
      mapper.createMap(TagOutput, Tag);
    };
  }
}
