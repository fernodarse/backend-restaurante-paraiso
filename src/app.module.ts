import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { MongoModule } from './mongo/mongo.module'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { MulterModule } from '@nestjs/platform-express';
import { EventoModule } from './evento/evento.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ComentModule } from './coment/coment.module';
import { BookingModule } from './booking/booking.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [             //'mongodb://admin:admin123@localhost/restaurante-paraiso' //mongodb+srv://admin:admin123@cluster0.2atrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority , "mongodb://893870adf3e66ce2d7acb94cb1f32ab0:admin123@11a.mongo.evennode.com:27018,11b.mongo.evennode.com:27018/893870adf3e66ce2d7acb94cb1f32ab0?replicaSet=eu-11"
    MongooseModule.forRoot("mongodb://893870adf3e66ce2d7acb94cb1f32ab0:admin123@11a.mongo.evennode.com:27018,11b.mongo.evennode.com:27018/893870adf3e66ce2d7acb94cb1f32ab0?replicaSet=eu-11"),
    MulterModule.register({ dest: './files', }),
    MenuModule,
    EventoModule,
    UsersModule,
    AuthModule,
    ComentModule,
    BookingModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
