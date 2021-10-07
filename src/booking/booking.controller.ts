import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MailService } from '../mail/mail.service';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Controller('booking')
export class BookingController {

    constructor(private readonly bookingService: BookingService,
        private userService: UsersService,
        private mailService: MailService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingService.getAll();
    }

    @Post()
    async create(@Body() bookingdto: CreateBookingDto) {
        let respuesta;
        try {
            let obj = (await this.bookingService.create(bookingdto))
            console.log('booking creado', obj)
            //const token = Math.floor(1000 + Math.random() * 9000).toString();
            /*let envioCorreo=(await this.mailService.sendUserConfirmation(user, token));  */
            let envioCorreo=(await this.mailService.sendBookingConfirmation(obj));
            envioCorreo ?
            respuesta = {
                statusCode: HttpStatus.OK,
                message: 'La reserva se ha registrado correctamente',
                entity: obj,
            }
            :
            respuesta= {
                statusCode: HttpStatus.OK,
                message: 'La reserva se ha registrado,en otro momento será notificado por correo',
                entity: obj,
            };

        } catch (error) {
            console.log(error)
            respuesta = {
                statusCode: HttpStatus.CONFLICT,
                message: 'Ha ocurrido un error, intentelo más tarde',
            };
        }
        return respuesta;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/id/:id')
    getBook(@Param('id') bookingId: string) {
        return this.bookingService.getBookingbyId(bookingId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateBook(
        @Param('id') bookingId: string,
        @Body() bookingdto: CreateBookingDto,
    ) {
        let respuesta;
        try {
            console.log('bokking recibido', bookingdto, bookingId)
            const updateObj = (await this.bookingService.update(bookingId, bookingdto));
            console.log('bokking modificado', updateObj)
            let envioCorreo=(await this.mailService.sendBookingConfirmation(updateObj,false));
            envioCorreo ?
            respuesta = {
                statusCode: HttpStatus.OK,
                message: 'La reserva se ha modificado correctamente',
                entity: updateObj,
            }
            :
            respuesta= {
                statusCode: HttpStatus.OK,
                message: 'La reserva se ha modificado,en otro momento será notificado por correo',
                entity: updateObj,
            };
        } catch (error) {
            console.log(error)
            respuesta = {
                statusCode: HttpStatus.CONFLICT,
                message: 'Ha ocurrido un error, intentelo más tarde',
            };
        }
        return respuesta;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeBook(@Param('id') eventoId: string) {
        const isDeleted = await this.bookingService.delete(eventoId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Reserva eliminada satifactoriamente',
            };
        }
        return {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'No se encuentra la reserva',
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('/book/hoy')
    getBookHoy() {
        return this.bookingService.getBookingHoy(new Date());
    }
}
