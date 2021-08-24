import { Column, CreateDateColumn, Entity, ManyToMany } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { BaseEntity } from '../../base.entity';

@Entity({ name: 'episode' })
export class Episode extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  desc: string;

  @Column({ type: 'varchar', length: 2083 })
  sourceUrl: string;

  @ManyToMany(() => Profile, profile => profile.episodes)
  accomplices: Profile[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  crimeDateTime: Date;

  // TODO: Tags

  // TODO: Views
}
