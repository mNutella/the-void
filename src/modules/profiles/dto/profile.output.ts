import { AutoMap } from '@automapper/classes';
import { IsArray, IsUUID } from 'class-validator';
import { EpisodeOutput } from '@modules/episodes/dto/episode.output';
import { ProfileBase } from './profile-base.dto';

export class ProfileOutput extends ProfileBase {
  @AutoMap()
  @IsUUID()
  id: string;

  @AutoMap({ typeFn: () => EpisodeOutput })
  @IsArray()
  episodes: EpisodeOutput[];
}
