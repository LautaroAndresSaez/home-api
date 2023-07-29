import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Home } from './Home.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  desc: string;

  @Column('date')
  date: Date;

  @Column('int8')
  priority: number;

  @ManyToOne(() => Home, (home) => home.tasks)
  home: Home;
}
