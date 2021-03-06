import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Injectable()
export class BookingService {

    constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) { }

    async create(booking: CreateBookingDto) {
        const createdObj = new this.bookingModel(booking);
        return await createdObj.save();
    }

    async update(id: string, booking: CreateBookingDto) {
        //console.log('buscar menu', id, menu)
        const findObj = (await this.findBookingbyId(id));
        // console.log('encontrado', findMenu)
        Object.assign(findObj, booking)
        //console.log('asigando', findMenu)
        return (await findObj).save();
    }

    async getAll(): Promise<any[]> {
        //orderBy('createdDate', 'desc'))
        const bookingList = (await this.bookingModel.find()
            .sort({ 'date': 'desc', 'createdDate': 'asc' })//-1 desc, 1 - asc
            .exec());
        return bookingList.map(booking => ({
            bookingId: booking.id,
            name: booking.name,
            email: booking.email,
            date: booking.date,
            time: booking.time,
            cantPersonas: booking.cantPersonas,
            mensaje: booking.mensaje,
            activo: booking.activo,
            createdDate: booking.createdDate,
        }));
    }

    async getBookingbyId(id: string): Promise<any> {
        const booking = (await this.findBookingbyId(id));
        return {
            bookingId: booking.id,
            name: booking.name,
            email: booking.email,
            date: booking.date,
            time: booking.time,
            cantPersonas: booking.cantPersonas,
            mensaje: booking.mensaje,
            activo: booking.activo,
            createdDate: booking.createdDate,
        };
    }

    async findBookingbyId(id: string): Promise<any> {
        try {
            const booking = (await this.bookingModel.findById(id).exec());

            if (booking === null) {
                throw new BadRequestException('No existe el Booking con id: ' + id);
            }

            return booking;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async delete(id: string) {
        const result = await this.bookingModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new BadRequestException('No existe el Booking con id: ' + id);
        }
        return true;
    }

    async getBookingHoy(date: Date): Promise<any> {
        //var finDay = new Date(moment().format("YYYY-MM-DD")+"T00:00:00.000Z");
        const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0)).toISOString()
        const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999)).toISOString()
        console.log('getBookingHoy', startOfDay, endOfDay)
        //var inputDate = new Date(new Date().toISOString());
        try {
            const coment = (await this.bookingModel.find({
                'date': { 
                    $gte : startOfDay,
                    $lt: endOfDay
                 }
            })
                .sort({ 'time': 1 })
                .exec());

            return coment.map(booking => ({
                bookingId: booking.id,
                name: booking.name,
                email: booking.email,
                date: booking.date,
                time: booking.time,
                cantPersonas: booking.cantPersonas,
                mensaje: booking.mensaje,
                activo: booking.activo,
                createdDate: booking.createdDate,
            }));
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}
