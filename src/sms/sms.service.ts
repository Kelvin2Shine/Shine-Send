import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private sms: any;

  constructor(private configService: ConfigService) {
    try {
      const africastalking = require('africastalking');
      
      const username = this.configService.get<string>('AFRICASTALKING_USERNAME');
      const apiKey = this.configService.get<string>('AFRICASTALKING_API_KEY');

      const client = africastalking({
        apiKey,
        username,
      });

      this.sms = client.SMS;
    } catch (error) {
      console.error('Failed to initialize Africa\'s Talking:', error);
      throw error;
    }
  }

  async sendSms(phoneNumber: string, message: string) {
    try {
      const result = await this.sms.send({
        to: [phoneNumber],
        message: message,
      });

      return {
        message: 'SMS sent successfully',
      };
    } catch (error) {
      console.error('SMS sending error:', error);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }
}
