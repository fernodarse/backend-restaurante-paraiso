import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import path, { join,resolve } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        //secure: false,
        port: 465,
        secure: true,

        auth: {
          user: 'lidiarosag19@gmail.com',
          pass: 'Habia1..vez',
          /*type: 'OAuth2',
          user: 'lidiarosag19',
          clientId: '147312251222-ofbslf2sijancvtbsjfd45nhuh6o3du9.apps.googleusercontent.com',
          clientSecret: 'WkC2Ysr6jnVCWI1YYp-ILFfy',
          refreshToken: 'local_settings.my_oauth_refresh_token',
          accessToken: 'local_settings.my_oauth_access_token'*/
        },
      },
      defaults: {
        from: '"RESTAURANTE | FINCA AGROECOLOGICA EL PARAISO" <lidiarosag19@gmail.com>',
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
