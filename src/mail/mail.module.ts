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
          /*user: 'lidiarosag19@gmail.com',
          pass: 'Habia1..vez',*/
          type: 'OAuth2',
          user: 'lidiarosag19',
          clientId: '197059767779-l8gcp6ocemneieqpotp7rrr2oqdq2v03.apps.googleusercontent.com',
          clientSecret: 'xFzYQUTlGp57x3TS-S__-Jp9',
          refreshToken: '1//04RpMwxmV7T3SCgYIARAAGAQSNwF-L9IrXWCQplccZ8VYAecWq9tt6gt6HRQz6JnLkj57AiobE8M1ODyJc_gbwKm-alGIhZf2YqM',
          accessToken: 'ya29.a0ARrdaM-dYDQQ7g1WOptS2lDRMzVXrPwCAXtdH0qStkK3HYsrk4cM24BG1eLZaOmnbSl2eE79BSp3la1PKXkhLHQjVGJ5R52Rxc9Uufu3Y1WG_Q3wXz8AQ9YUai5qdii73e3dwY0VgGTxV2_AU_c4NDuGc0tr'
        },
      },
      defaults: {
        from: '"RESTAURANTE | FINCA AGROECOLOGICA EL PARAISO" <lidiarosag19@gmail.com>',
      },
      template: {
        dir: process.cwd() + '/src/mail/templates/',
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
