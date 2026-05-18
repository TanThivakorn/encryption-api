import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EncryptDataDto {
  @ApiProperty({
    example: 'hello world',
    description: 'Payload to encrypt, max 2000 characters',
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  payload!: string;
}