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
          refreshToken: '1//04K90Qu2n9nV0CgYIARAAGAQSNwF-L9IrSKUzoGdchdjCdkslRGkI4A_n8MNC2QOWbCTbQq5owbFNM0MCBUCrKF8i-b-S-_3_NdE',
          accessToken: 'ya29.a0ARrdaM9V5YBwUb1GL4YU4D56Q0FE_9i5gj6N-rmnn3OrjBJIHsOMS1Q9IsGGYtbKd9B-o5gP_0s1IJsS2p0y1C5fHZdvJOg-tThnKQvSkVrNPotnS38d0EmEmfFTp4l9ArrfX0sMJBqfrjQFNBz-NK2MZgui'
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
