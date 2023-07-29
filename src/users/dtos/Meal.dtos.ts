import { MEAL_TIMES, MealTime } from '../entities/Meal.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinDate,
} from 'class-validator';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @Length(4, 255)
  @ApiProperty()
  readonly desc: string;

  @IsDate()
  @MinDate(new Date())
  @ApiProperty()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  @IsIn(MEAL_TIMES)
  @ApiProperty()
  readonly time: MealTime;
}

export class UpdateMealDto extends PartialType(CreateMealDto) {}
