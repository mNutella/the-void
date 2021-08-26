import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Profile } from '@modules/profiles/entities/profile.entity';
import { BaseEntity } from '@app/base.entity';
import { Tag } from '@modules/tags/entities/tag.entity';

@Entity({ name: 'episode' })
export class Episode extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  desc: string;

  @Column({ type: 'varchar', length: 2083 })
  sourceUrl: string;

  @ManyToMany(() => Profile, (profile) => profile.episodes)
  @JoinTable({
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

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  crimeDateTime: Date;

  // TODO: Views
}
