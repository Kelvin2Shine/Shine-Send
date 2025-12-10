import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as brevo from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  private brevoApi: brevo.TransactionalEmailsApi;

  constructor(private configService: ConfigService) {
   
    const apiKey = this.configService.get<string>('BREVO_API_KEY');
    
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not configured');
    }
    
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    
    this.brevoApi = apiInstance;
  }

  async sendEmail(recipientEmail: string, subject: string, message: string) {
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      
      sendSmtpEmail.sender = {
        name: this.configService.get<string>('BREVO_SENDER_NAME'),
        email: this.configService.get<string>('BREVO_SENDER_EMAIL'),
      };
      
      sendSmtpEmail.to = [{ email: recipientEmail }];
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = message;

      const result = await this.brevoApi.sendTransacEmail(sendSmtpEmail);
      
      return {
        message: 'Email sent successfully',
        messageId: result.body.messageId,
      };
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}