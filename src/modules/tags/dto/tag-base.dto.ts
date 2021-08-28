import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class TagBase implements Readonly<TagBase> {
  @AutoMap()
  @IsString()
  name: string;
}
