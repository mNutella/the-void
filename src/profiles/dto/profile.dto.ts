import { IsString, IsUUID, IsInt } from 'class-validator';
import { Profile } from '../profile.entity';

export class ProfileDTO implements Readonly<ProfileDTO> {
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

  public static from(dto: Partial<ProfileDTO>) {
    const it = new ProfileDTO();
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

  public static toEntity(profile: ProfileDTO) {
    const it = new Profile();
    it.id = profile.id;
    it.name = profile.name;
    it.type = profile.type;
    it.info = profile.info;
    it.city = profile.info;
    it.createDateTime = new Date();
    it.createdBy = 'Def';
    it.lastChangedBy = 'Def';
    return it;
  }
}
