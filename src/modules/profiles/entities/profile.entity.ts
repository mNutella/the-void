import { Entity, Column, ManyToMany } from 'typeorm';
import { Episode } from '@modules/episodes/entities/episode.entity';
import { BaseEntity } from '@app/base.entity';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  city: string;

  @Column('int')
  type: number;

  @Column({ type: 'varchar', length: 300 })
  info: string;

  @ManyToMany(() => Episode, (episode) => episode.accomplices)
  episodes: Episode[];
}
