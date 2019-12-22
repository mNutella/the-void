import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

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
}
