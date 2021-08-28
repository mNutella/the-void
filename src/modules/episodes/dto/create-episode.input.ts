import { AutoMap } from '@automapper/classes';
import { IsArray } from 'class-validator';
import { CreateProfileInput } from '@modules/profiles/dto/create-profile.input';
import { CreateTagInput } from '@modules/tags/dto/create-tag.input';
import { EpisodeBase } from './episode-base.dto';

export class CreateEpisodeInput extends EpisodeBase {
  @AutoMap({ typeFn: () => CreateProfileInput })
  @IsArray()
  accomplices: CreateProfileInput[];

  @AutoMap({ typeFn: () => CreateTagInput })
  @IsArray()
  tags: CreateTagInput[];
}
