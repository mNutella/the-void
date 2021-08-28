import { AutoMap } from '@automapper/classes';
import { IsArray, IsUUID } from 'class-validator';
import { ProfileOutput } from '@modules/profiles/dto/profile.output';
import { TagOutput } from '@modules/tags/dto/tag.output';
import { EpisodeBase } from './episode-base.dto';

export class EpisodeOutput extends EpisodeBase {
  @AutoMap()
  @IsUUID()
  id: string;

  @AutoMap({ typeFn: () => ProfileOutput })
  @IsArray()
  accomplices: ProfileOutput[];

  @AutoMap({ typeFn: () => TagOutput })
  @IsArray()
  tags: TagOutput[];
}
