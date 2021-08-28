import { AutoMap } from '@automapper/classes';
import { IsArray, IsUUID } from 'class-validator';
import { UpdateEpisodeInput } from '@modules/episodes/dto/update-episode.input';
import { TagBase } from './tag-base.dto';

export class UpdateTagInput extends TagBase {
  @AutoMap()
  @IsUUID()
  id: string;

  @AutoMap({ typeFn: () => UpdateEpisodeInput })
  @IsArray()
  episodes: UpdateEpisodeInput[];
}
