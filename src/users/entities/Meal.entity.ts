import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Home } from './Home.entity';

export const MEAL_TIMES = ['breakfast', 'lunch', 'drunch', 'dinner'] as const;

export type MealTime = (typeof MEAL_TIMES)[number];

@Entity()
export class Meal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar')
  desc: string;

  @Column('date')
  date: Date;

  @Column('varchar')
  time: MealTime;

  @ManyToOne(() => Home, (home) => home.meals)
  home: Home;
}
