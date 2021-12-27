import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventoDto } from './dto/create-evento.dto';
import { Evento } from './schemas/evento.schema';

@Injectable()
export class EventoService {

    constructor(@InjectModel(Evento.name) private model: Model<Evento>) { }

    async create(evento: CreateEventoDto) {
        const createdObj = new this.model(evento);
        return await createdObj.save();
    }

    async update(id: string, evento: CreateEventoDto) {
        //console.log('buscar evento', id, evento)
        const findObj = (await this.findEventobyId(id));
       // console.log('encontrado', findObj)
        Object.assign(findObj, evento)
        //console.log('asigando', findObj)
        return (await findObj).save();
    }

    async getAllEventos(): Promise<any[]> {
        //orderBy('createdDate', 'desc'))
        const objList = (await this.model.find()
        .sort({ 'createdDate' : -1 } )//desc, 1 - asc
        .exec());
        return objList.map(evento => ({
            eventoId: evento.id,
            name: evento.name,
            descripcion: evento.descripcion,
            destacado: evento.destacado,
            createdDate: evento.createdDate,
            photoURL: evento.photoURL,
            datosImg: evento.datosImg,
        }));
    }

    async getEventobyId(id: string): Promise<any> {
        const evento =   (await this.findEventobyId(id));
        return {
            eventoId: evento.id,
            name: evento.name,
            descripcion: evento.descripcion,
            destacado: evento.destacado,
            createdDate: evento.createdDate,
            photoURL: evento.photoURL,
            datosImg: evento.datosImg,
        };
    }

    async findEventobyId(id: string): Promise<any> {
        try {
            const evento = (await this.model.findById(id).exec());

            if (evento === null) {
                throw new BadRequestException('No existe el evento con id: ' + id);
            }

            return evento;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async delete(id: string) {
        const result = await this.model.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new BadRequestException('No existe el evento con id: ' + id);
        }
        return true;
    }

}
