import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Controller('booking')
export class BookingController {

    constructor(private readonly bookingService: BookingService,
        private userService: UsersService,
        private mailService: MailService) { }

    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingService.getAll();
    }

    @Post()
    async create(@Body() bookingdto: CreateBookingDto) {
       let respuesta;
        try {
            let user = (await this.userService.findById(bookingdto.userId));
            if (user) {
                let obj = (await this.bookingService.create(bookingdto))
                console.log('booking creado', obj)
                const token = Math.floor(1000 + Math.random() * 9000).toString();
                /*let envioCorreo=(await this.mailService.sendUserConfirmation(user, token));            
                envioCorreo ?*/
                respuesta= {
                    statusCode: HttpStatus.OK,
                    message: 'La reserva se ha registrado correctamente',
                    entity: obj,
                }
                /*:
                respuesta= {
                    statusCode: HttpStatus.OK,
                    message: 'La reserva se ha registrado,en otro momento será notificado por correo',
                    entity: obj,
                };*/
            }
        } catch (error) {
            console.log(error)
            respuesta={
                statusCode: HttpStatus.NOT_FOUND,
                message: 'No se encuentra el usuario',
            };
        }
        return respuesta;
    }

    @Get('/id/:id')
    getBook(@Param('id') bookingId: string) {
        return this.bookingService.getBookingbyId(bookingId);
    }

    @Patch(':id')
    async updateBook(
        @Param('id') bookingId: string,
        @Body() bookingdto: CreateBookingDto,
    ) {
        console.log('bokking recibido', bookingdto, bookingId)
        const updateObj = await this.bookingService.update(bookingId, bookingdto);
        console.log('bokking modificado', updateObj)
        return updateObj;
    }

    @Delete(':id')
    async removeBook(@Param('id') eventoId: string) {
        const isDeleted = await this.bookingService.delete(eventoId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Evento eliminado satifactoriamente',
            };
        }
    }
}
