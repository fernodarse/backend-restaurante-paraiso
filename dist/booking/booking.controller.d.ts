import { HttpStatus } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';
export declare class BookingController {
    private readonly bookingService;
    private userService;
    private mailService;
    constructor(bookingService: BookingService, userService: UsersService, mailService: MailService);
    findAll(): Promise<Booking[]>;
    create(bookingdto: CreateBookingDto): Promise<any>;
    getBook(bookingId: string): Promise<any>;
    updateBook(bookingId: string, bookingdto: CreateBookingDto): Promise<any>;
    removeBook(eventoId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    getBookHoy(): Promise<any>;
}
