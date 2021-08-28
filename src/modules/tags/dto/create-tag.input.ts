import { AutoMap } from '@automapper/classes';
import { CreateEpisodeInput } from '@modules/episodes/dto/create-episode.input';
import { IsArray } from 'class-validator';
import { TagBase } from './tag-base.dto';

export class CreateTagInput extends TagBase {
  @AutoMap({ typeFn: () => CreateEpisodeInput })
  @IsArray()
  episodes: CreateEpisodeInput[];
}
