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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@localhost/restaurante-paraiso'),
    MulterModule.register({ dest: './files', }),
    MenuModule,
    EventoModule,
    UsersModule,
    AuthModule,
    ComentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
