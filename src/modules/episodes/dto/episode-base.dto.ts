import { IsString, IsDate } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class EpisodeBase implements Readonly<EpisodeBase> {
  @AutoMap()
  @IsString()
  title: string;

  @AutoMap()
  @IsString()
  desc: string;

  @AutoMap()
  @IsString()
  sourceUrl: string;

  @AutoMap()
  @IsDate()
  crimeDateTime: Date;
}
