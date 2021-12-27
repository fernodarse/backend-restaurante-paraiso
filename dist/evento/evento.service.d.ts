import { Model } from 'mongoose';
import { CreateEventoDto } from './dto/create-evento.dto';
import { Evento } from './schemas/evento.schema';
export declare class EventoService {
    private model;
    constructor(model: Model<Evento>);
    create(evento: CreateEventoDto): Promise<Evento>;
    update(id: string, evento: CreateEventoDto): Promise<any>;
    getAllEventos(): Promise<any[]>;
    getEventobyId(id: string): Promise<any>;
    findEventobyId(id: string): Promise<any>;
    delete(id: string): Promise<boolean>;
}
