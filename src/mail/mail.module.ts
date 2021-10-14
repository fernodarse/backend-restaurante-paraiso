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
          pass: 'zwulxansglgbycic',
          /*clientId: '197059767779-l8gcp6ocemneieqpotp7rrr2oqdq2v03.apps.googleusercontent.com',
          type: 'OAuth2',
          user: 'lidiarosag19',
          clientSecret: 'xFzYQUTlGp57x3TS-S__-Jp9',
          refreshToken: '1//04kCE_BES-X64CgYIARAAGAQSNwF-L9IrBPK6zu9nxsFyl0znZ0E8dSX4N8lE_nr2ZajeX-vhSr0gTAcdNt5FcWCpvENuQbPs35o',
          accessToken: 'ya29.a0ARrdaM-BubdS_aNER0zQiCK4UVWBNTfuwB4-k4uqRIQhEN0iEOTtPjw1WrJdGQ8rA_NFGLndjcZODIEEnIlsczWEHrd-6Q5l5EONoGJijAE9-qRmYYURVePPweyWnfLkTZoECajhYJtIUF7X3kYl4HJChYbv',
          expires: 3599*/
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
