import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    example: 'recipient@example.com',
    description: 'The email address of the recipient',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Test Email Subject',
    description: 'The subject of the email',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: '<h1>Hello</h1><p>This is a test email</p>',
    description: 'The HTML content of the email',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}