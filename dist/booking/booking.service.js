"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("./schemas/booking.schema");
let BookingService = class BookingService {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async create(booking) {
        const createdObj = new this.bookingModel(booking);
        return await createdObj.save();
    }
    async update(id, booking) {
        const findObj = (await this.findBookingbyId(id));
        Object.assign(findObj, booking);
        return (await findObj).save();
    }
    async getAll() {
        const bookingList = (await this.bookingModel.find()
            .sort({ 'date': 'desc', 'createdDate': 'asc' })
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
    async getBookingbyId(id) {
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
    async findBookingbyId(id) {
        try {
            const booking = (await this.bookingModel.findById(id).exec());
            if (booking === null) {
                throw new common_1.BadRequestException('No existe el Booking con id: ' + id);
            }
            return booking;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        const result = await this.bookingModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new common_1.BadRequestException('No existe el Booking con id: ' + id);
        }
        return true;
    }
    async getBookingHoy(date) {
        const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999)).toISOString();
        console.log('getBookingHoy', startOfDay, endOfDay);
        try {
            const coment = (await this.bookingModel.find({
                'date': {
                    $gte: startOfDay,
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
BookingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map