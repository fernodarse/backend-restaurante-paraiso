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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const moment = require("moment");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendUserConfirmation(user, token) {
        const url = `example.com/auth/confirm?token=${token}`;
        console.log('envindo correo a ', user.email);
        let envio = false;
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Welcome to Nice App! Confirm your Email',
                template: './confirmation',
                context: {
                    name: user.name,
                    url,
                },
            });
            envio = true;
        }
        catch (error) {
            console.log(error);
        }
        return envio;
    }
    async sendBookingConfirmation(booking, nuevo = true) {
        console.log('envindo correo a ', booking.email);
        let envio = false;
        let fecha = moment(new Date(booking.date.toLocaleString("en-US", { timeZone: "America/New_York" }))).format('ll');
        let hora = moment(new Date(booking.time.toLocaleString("en-US", { timeZone: "America/New_York" }))).format('HH:mm');
        console.log('datos ', fecha + ' ' + hora);
        try {
            await this.mailerService.sendMail({
                to: booking.email,
                subject: 'Gracias por su reserva! ',
                template: './booking-crear',
                context: {
                    name: booking.name,
                    fecha: fecha,
                    hora: hora,
                    mensaje: booking.mensaje,
                    cantPer: booking.cantPersonas,
                    nuevo: nuevo
                },
            });
            envio = true;
        }
        catch (error) {
            console.log('el error', error);
        }
        return envio;
    }
    async sendCommentConfirmation(coment, nuevo = true) {
        console.log('envindo correo a ', coment.email);
        let envio = false;
        let fecha = moment(coment.commentDate).format('ll');
        try {
            await this.mailerService.sendMail({
                to: coment.email,
                subject: 'Gracias por su comentario!',
                template: './coment-crear',
                context: {
                    name: coment.commentedBy,
                    fecha: fecha,
                    mensaje: coment.content,
                    nuevo: nuevo
                },
            });
            envio = true;
        }
        catch (error) {
            console.log('el error', error);
        }
        return envio;
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map