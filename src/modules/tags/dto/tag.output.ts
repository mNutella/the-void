import { AutoMap } from '@automapper/classes';
import { IsArray, IsUUID } from 'class-validator';
import { EpisodeOutput } from '@modules/episodes/dto/episode.output';
import { TagBase } from './tag-base.dto';

export class TagOutput extends TagBase {
  @AutoMap()
  @IsUUID()
  id: string;

  @AutoMap({ typeFn: () => EpisodeOutput })
  @IsArray()
  episodes: EpisodeOutput[];
}
