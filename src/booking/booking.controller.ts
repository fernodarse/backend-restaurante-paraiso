import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Controller('booking')
export class BookingController {

    constructor(private readonly bookingService: BookingService) { }

    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingService.getAll();
    }

    @Post()
    async create(@Body() bookingdto: CreateBookingDto) {
      let obj=  this.bookingService.create(bookingdto)
      console.log('booking creado', obj)
       return obj;
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
        console.log('bokking recibido', bookingdto,bookingId )
        const updateObj = await this.bookingService.update(bookingId, bookingdto);
        console.log('bokking modificado', updateObj )
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
