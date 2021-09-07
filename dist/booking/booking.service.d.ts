import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';
export declare class BookingService {
    private bookingModel;
    constructor(bookingModel: Model<Booking>);
    create(booking: CreateBookingDto): Promise<Booking>;
    update(id: string, booking: CreateBookingDto): Promise<any>;
    getAll(): Promise<any[]>;
    getBookingbyId(id: string): Promise<any>;
    findBookingbyId(id: string): Promise<any>;
    delete(id: string): Promise<boolean>;
}
