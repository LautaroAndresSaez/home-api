import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lautaro',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Perez' })
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'lauti@perez.com' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
