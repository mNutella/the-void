import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '@app/base.entity';
import { AutoMap } from '@automapper/classes';
import { Profile } from '@modules/profiles/entities/profile.entity';
import { Tag } from '@modules/tags/entities/tag.entity';

@Entity({ name: 'episode' })
export class Episode extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 500 })
  desc: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 2083 })
  sourceUrl: string;

  @AutoMap({ typeFn: () => Profile })
  @ManyToMany(() => Profile, (profile) => profile.episodes)
  @JoinTable({
    name: 'episode_profile',
    joinColumn: {
      name: 'episode',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'profile',
      referencedColumnName: 'id',
    },
  })
  accomplices: Profile[];

  @AutoMap({ typeFn: () => Tag })
  @ManyToMany(() => Tag, (tag) => tag.episodes)
  @JoinTable({
    name: 'episode_tag',
    joinColumn: {
      name: 'episode',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @AutoMap()
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  crimeDateTime: Date;

  // TODO: Views
}
