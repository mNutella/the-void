import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Profile } from '@modules/profiles/entities/profile.entity';
import { BaseEntity } from '@app/base.entity';

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

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  crimeDateTime: Date;

  // TODO: Tags

  // TODO: Views
}
