import { IsString, IsUUID, IsInt, IsArray, IsDate } from 'class-validator';
import { Profile } from '../../profiles/entities/profile.entity';
import { Episode } from '../entities/episode.entity';

export class CreateEpisodeInput implements Readonly<CreateEpisodeInput> {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsString()
  sourceUrl: string;

  @IsArray()
  accomplices: Profile[];

  @IsDate()
  crimeDateTime: Date;

  public static from(dto: Partial<CreateEpisodeInput>) {
    const it = new CreateEpisodeInput();
    it.id = dto.id;
    it.title = dto.title;
    it.desc = dto.desc;
    it.sourceUrl = dto.sourceUrl;
    it.accomplices = dto.accomplices;
    it.crimeDateTime = dto.crimeDateTime;
    return it;
  }

  public static fromEntity(entity: Episode) {
    return this.from({
      id: entity.id,
      title: entity.title,
      desc: entity.desc,
      sourceUrl: entity.sourceUrl,
      accomplices: entity.accomplices,
      crimeDateTime: entity.crimeDateTime,
    });
  }

  public static toEntity(episode: CreateEpisodeInput) {
    const it = new Episode();
    it.id = episode.id;
    it.title = episode.title;
    it.desc = episode.desc;
    it.sourceUrl = episode.sourceUrl;
    it.accomplices = episode.accomplices;
    it.createDateTime = new Date();
    it.createdBy = 'Admin';
    it.lastChangedBy = 'Admin';
    return it;
  }
}
