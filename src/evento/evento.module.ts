import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evento, EventoSchema } from './schemas/evento.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }])],
    providers: [EventoService],
    controllers: [EventoController]
})
export class EventoModule { }
