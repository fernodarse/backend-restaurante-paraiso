import { HttpStatus } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { EventoService } from './evento.service';
import { Evento } from './schemas/evento.schema';
export declare class EventoController {
    private readonly eventoService;
    constructor(eventoService: EventoService);
    findAll(): Promise<Evento[]>;
    create(eventodto: CreateEventoDto): Promise<Evento>;
    getBook(eventoId: string): Promise<any>;
    updateBook(eventoId: string, eventodto: CreateEventoDto): Promise<any>;
    removeBook(eventoId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
