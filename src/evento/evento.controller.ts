import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { EventoService } from './evento.service';
import { Evento } from './schemas/evento.schema';

@Controller('evento')
export class EventoController {

    constructor(private readonly eventoService: EventoService) { }

    @Get()
    async findAll(): Promise<Evento[]> {
        return this.eventoService.getAllEventos();
    }

    @Post()
    async create(@Body() eventodto: CreateEventoDto) {
      let obj=  this.eventoService.create(eventodto)
      console.log('evento creado', obj)
       return obj;
    }

    @Get('/id/:id')
    getBook(@Param('id') eventoId: string) {
        return this.eventoService.getEventobyId(eventoId);
    }

    @Patch(':id')
    async updateBook(
        @Param('id') eventoId: string,
        @Body() eventodto: CreateEventoDto,
    ) {
        console.log('evento recibido', eventodto,eventoId )
        const updateObj = await this.eventoService.update(eventoId, eventodto);
        console.log('evento modificado', updateObj )
        return updateObj;
    }

    @Delete(':id')
    async removeBook(@Param('id') eventoId: string) {
        const isDeleted = await this.eventoService.delete(eventoId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Evento eliminado satifactoriamente',
            };
        }
    }
}
