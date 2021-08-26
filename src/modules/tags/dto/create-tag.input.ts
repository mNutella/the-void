import { CreateEpisodeInput } from '@modules/episodes/dto/create-episode.input';
import { Episode } from '@modules/episodes/entities/episode.entity';
import { IsArray, IsString, IsUUID } from 'class-validator';
import { Tag } from '../entities/tag.entity';

export class CreateTagInput implements Readonly<CreateTagInput> {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  episodes: Episode[];

  public static from(dto: Partial<CreateTagInput>) {
    const it = new CreateTagInput();

    it.id = dto.id;
    it.name = dto.name;
    it.episodes = dto.episodes;
    return it;
  }

  public static fromEntity(entity: Tag) {
    return this.from({
      id: entity.id,
      name: entity.name,
      episodes: entity.episodes?.map((episode) => CreateEpisodeInput.fromEntity(episode)),
    });
  }

  public static toEntity(tag: CreateTagInput) {
    const it = new Tag();
    it.id = tag.id;
    it.name = tag.name;
    it.episodes = tag.episodes?.map((episode) => CreateEpisodeInput.toEntity(episode));
    it.createDateTime = new Date();
    it.createdBy = 'Admin';
    it.lastChangedBy = 'Admin';
    return it;
  }
}
