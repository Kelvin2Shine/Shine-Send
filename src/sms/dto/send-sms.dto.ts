import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendSmsDto {
  @ApiProperty({
    example: '+233201234567',
    description: 'The phone number of the recipient (with country code)',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'Hello, this is a test SMS from Shine-Send!',
    description: 'The content of the SMS message',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}