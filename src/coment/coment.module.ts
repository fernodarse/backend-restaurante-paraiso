import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coment, ComentSchema } from './schemas/coment.schema';
import { ComentService } from './coment.service';
import { ComentController } from './coment.controller';

@Module({
    imports: [ MongooseModule.forFeature([{ name: Coment.name, schema: ComentSchema }])],
    controllers: [ComentController],
    providers: [ComentService]
  })
export class ComentModule {}
