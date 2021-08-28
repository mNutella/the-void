import { AutoMap } from '@automapper/classes';
import { IsArray } from 'class-validator';
import { CreateEpisodeInput } from '@modules/episodes/dto/create-episode.input';
import { ProfileBase } from './profile-base.dto';

export class CreateProfileInput extends ProfileBase {
  @AutoMap({ typeFn: () => CreateEpisodeInput })
  @IsArray()
  episodes?: CreateEpisodeInput[];
}
