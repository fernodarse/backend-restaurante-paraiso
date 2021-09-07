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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const mail_service_1 = require("../mail/mail.service");
const users_service_1 = require("../users/users.service");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
let BookingController = class BookingController {
    constructor(bookingService, userService, mailService) {
        this.bookingService = bookingService;
        this.userService = userService;
        this.mailService = mailService;
    }
    async findAll() {
        return this.bookingService.getAll();
    }
    async create(bookingdto) {
        let respuesta;
        try {
            let obj = (await this.bookingService.create(bookingdto));
            console.log('booking creado', obj);
            let envioCorreo = (await this.mailService.sendBookingConfirmation(obj));
            envioCorreo ?
                respuesta = {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'La reserva se ha registrado correctamente',
                    entity: obj,
                }
                :
                    respuesta = {
                        statusCode: common_1.HttpStatus.OK,
                        message: 'La reserva se ha registrado,en otro momento será notificado por correo',
                        entity: obj,
                    };
        }
        catch (error) {
            console.log(error);
            respuesta = {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: 'Ha ocurrido un error, intentelo más tarde',
            };
        }
        return respuesta;
    }
    getBook(bookingId) {
        return this.bookingService.getBookingbyId(bookingId);
    }
    async updateBook(bookingId, bookingdto) {
        let respuesta;
        try {
            console.log('bokking recibido', bookingdto, bookingId);
            const updateObj = (await this.bookingService.update(bookingId, bookingdto));
            console.log('bokking modificado', updateObj);
            let envioCorreo = (await this.mailService.sendBookingConfirmation(updateObj, false));
            envioCorreo ?
                respuesta = {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'La reserva se ha modificado correctamente',
                    entity: updateObj,
                }
                :
                    respuesta = {
                        statusCode: common_1.HttpStatus.OK,
                        message: 'La reserva se ha modificado,en otro momento será notificado por correo',
                        entity: updateObj,
                    };
        }
        catch (error) {
            console.log(error);
            respuesta = {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: 'Ha ocurrido un error, intentelo más tarde',
            };
        }
        return respuesta;
    }
    async removeBook(eventoId) {
        const isDeleted = await this.bookingService.delete(eventoId);
        if (isDeleted) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Reserva eliminada satifactoriamente',
            };
        }
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: 'No se encuentra la reserva',
        };
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "getBook", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateBook", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "removeBook", null);
BookingController = __decorate([
    common_1.Controller('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        users_service_1.UsersService,
        mail_service_1.MailService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map