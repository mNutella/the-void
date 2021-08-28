import { IsString, IsInt, IsUUID } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class ProfileBase implements Readonly<ProfileBase> {
  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsString()
  city: string;

  @AutoMap()
  @IsInt()
  type: number;

  @AutoMap()
  @IsString()
  info: string;
}
