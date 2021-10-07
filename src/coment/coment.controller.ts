import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { ComentService } from './coment.service';
import { CreateComentDto } from './dto/create-coment.dto';
import { Coment } from './schemas/coment.schema';

@Controller('coment')
export class ComentController {

    constructor(private readonly comentService: ComentService,
        private mailService: MailService) { }

    @Get()
    async findAll(): Promise<Coment[]> {
        return this.comentService.getAllComents();
    }

    @Post()
    async create(@Body() menudto: CreateComentDto) {
        let respuesta;
        try {
            let obj = (await this.comentService.create(menudto))
            let envioCorreo=(await this.mailService.sendCommentConfirmation(obj));
            envioCorreo ?
            respuesta = {
                statusCode: HttpStatus.OK,
                message: 'Su comentario se ha registrado correctamente',
                entity: obj,
            }
            :
            respuesta= {
                statusCode: HttpStatus.OK,
                message: 'El comentario se ha registado,no ha podido ser notificado por correo',
                entity: obj,
            };
            console.log('Comentario creado', obj)
        } catch (error) {
            console.log(error)
            respuesta = {
                statusCode: HttpStatus.CONFLICT,
                message: 'Ha ocurrido un error, intentelo más tarde',
            };
        }
        return respuesta;
    }

    @Get('/id/:id')
    getComent(@Param('id') comentId: string) {
        return this.comentService.getComentbyId(comentId);
    }

    @Get('/coment/menu/:idMenu')
    getComentByMenu(@Param('idMenu') menuId: string) {
        return this.comentService.getComentbyMenu(menuId);
    }

    @Patch(':id')
    async updateComent(
        @Param('id') comentId: string,
        @Body() comentdto: CreateComentDto,
    ) {
        console.log('menu recibido', comentdto, comentId)
        const updateComent = await this.comentService.update(comentId, comentdto);
        return updateComent;
    }

    @Delete(':id')
    async removeMenu(@Param('id') comentId: string) {
        const isDeleted = await this.comentService.delete(comentId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Menu eliminado satifactoriamente',
            };
        }
    }

    @Get('/last/:dia')
    getLastComent(@Param('dia') dia: number) {
        console.log('buscando ', dia)
        return this.comentService.getLastComent(dia);
    }


}
