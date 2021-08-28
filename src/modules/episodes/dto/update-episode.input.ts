import { AutoMap } from '@automapper/classes';
import { IsArray, IsUUID } from 'class-validator';
import { UpdateProfileInput } from '@modules/profiles/dto/update-profile.input';
import { UpdateTagInput } from '@modules/tags/dto/update-tag.input';
import { EpisodeBase } from './episode-base.dto';

export class UpdateEpisodeInput extends EpisodeBase {
  @AutoMap()
  @IsUUID()
  id: string;

  @AutoMap({ typeFn: () => UpdateProfileInput })
  @IsArray()
  accomplices: UpdateProfileInput[];

  @AutoMap({ typeFn: () => UpdateTagInput })
  @IsArray()
  tags: UpdateTagInput[];
}
