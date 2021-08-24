import { IsString, IsUUID, IsInt, IsArray } from 'class-validator';
import { Episode } from '../../episodes/entities/episode.entity';
import { Profile } from '../entities/profile.entity';

export class CreateProfileInput implements Readonly<CreateProfileInput> {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsInt()
  type: number;

  @IsString()
  info: string;

  @IsArray()
  episodes: Episode[];

  public static from(dto: Partial<CreateProfileInput>) {
    const it = new CreateProfileInput();
    it.id = dto.id;
    it.name = dto.name;
    it.type = dto.type;
    it.info = dto.info;
    return it;
  }

  public static fromEntity(entity: Profile) {
    return this.from({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      info: entity.info,
    });
  }

  public static toEntity(profile: CreateProfileInput) {
    const it = new Profile();
    it.id = profile.id;
    it.name = profile.name;
    it.type = profile.type;
    it.info = profile.info;
    it.city = profile.city;
    it.createDateTime = new Date();
    it.createdBy = 'Admin';
    it.lastChangedBy = 'Admin';
    return it;
  }
}
