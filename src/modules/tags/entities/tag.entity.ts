import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@app/base.entity';
import { Episode } from '@modules/episodes/entities/episode.entity';

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @AutoMap({ typeFn: () => Episode })
  @ManyToMany(() => Episode, (episode) => episode.tags)
  episodes: Episode[];
}
