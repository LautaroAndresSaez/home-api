import { User } from 'src/auth/entities/User.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task.entity';
import { Meal } from './Meal.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.home)
  users: User[];

  @OneToMany(() => Task, (task) => task.home)
  tasks: Task[];

  @OneToMany(() => Meal, (meal) => meal.home)
  meals: Meal[];
}
