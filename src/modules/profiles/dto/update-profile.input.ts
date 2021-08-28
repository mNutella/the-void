import { AutoMap } from '@automapper/classes';
import { IsArray, IsUUID } from 'class-validator';
import { UpdateEpisodeInput } from '@modules/episodes/dto/update-episode.input';
import { ProfileBase } from './profile-base.dto';

export class UpdateProfileInput extends ProfileBase {
  @AutoMap()
  @IsUUID()
  id: string;
  @AutoMap({ typeFn: () => UpdateEpisodeInput })
  @IsArray()
  episodes?: UpdateEpisodeInput[];
}
