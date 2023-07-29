import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  MinDate,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  readonly name: string;

  @IsString()
  @IsOptional()
  @Length(4, 1500)
  @ApiProperty({ example: 'Buy: coffee, apples, milk' })
  readonly desc: string;

  @IsDate()
  @IsNotEmpty()
  @MinDate(new Date())
  @ApiProperty()
  readonly date: Date;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(255)
  @ApiProperty({ example: 18 })
  readonly priority: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
