import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class UpdateHomeDto extends PartialType(CreateHomeDto) {}
