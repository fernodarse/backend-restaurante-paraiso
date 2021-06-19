import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ComentService } from './coment.service';
import { CreateComentDto } from './dto/create-coment.dto';
import { Coment } from './schemas/coment.schema';

@Controller('coment')
export class ComentController {

    constructor(private readonly comentService: ComentService) { }

    @Get()
    async findAll(): Promise<Coment[]> {
        return this.comentService.getAllComents();
    }

    @Post()
    async create(@Body() menudto: CreateComentDto) {
       return this.comentService.create(menudto);
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
        console.log('menu recibido', comentdto,comentId )
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



}
