import { AutoMap } from '@automapper/classes';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Episode } from '@modules/episodes/entities/episode.entity';
import { BaseEntity } from '@app/base.entity';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 300 })
  city: string;

  @AutoMap()
  @Column('int')
  type: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 300 })
  info: string;

  @AutoMap({ typeFn: () => Episode })
  @ManyToMany(() => Episode, (episode) => episode.accomplices)
  episodes: Episode[];
}
