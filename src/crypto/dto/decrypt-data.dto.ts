import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DecryptDataDto {
  @ApiProperty({
    example: 'encrypted data1',
  })
  @IsString()
  @IsNotEmpty()
  data1!: string;

  @ApiProperty({
    example: 'encrypted data2',
  })
  @IsString()
  @IsNotEmpty()
  data2!: string;
}