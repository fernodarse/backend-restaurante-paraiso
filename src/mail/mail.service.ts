import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Booking } from '../booking/schemas/booking.schema';
import { User } from '../users/schemas/user.schema';
import * as moment from 'moment';
import { Coment } from '../coment/schemas/coment.schema';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user:User, token: string) {
        const url = `example.com/auth/confirm?token=${token}`;
        console.log('envindo correo a ',user.email)
        let envio=false;
        try{
        await this.mailerService.sendMail({
            to: user.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation', // `.hbs` extension is appended automatically 
            context: { // ✏️ filling curly brackets with content
                name: user.name,
                url,
            },
        });
        envio=true;
        }catch(error){
            console.log(error)
        }
        return envio
    }

    async sendBookingConfirmation(booking:Booking,nuevo:boolean = true) {
        console.log('envindo correo a ',booking.email)
        let envio=false;
        let fecha= moment(new Date(booking.date.toLocaleString("en-US", {timeZone: "America/New_York"}))).format('ll'); //'D-MMM-YYYY'
        let hora=  moment(new Date(booking.time.toLocaleString("en-US", {timeZone: "America/New_York"}))).format('LT');
        //console.log('otro formato ', moment(booking.date).format('ll'))
        console.log('datos ',fecha +' ' + hora)
        try{
        await this.mailerService.sendMail({
            to: booking.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Gracias por su reserva! ',
            template: './booking-crear', // `.hbs` extension is appended automatically 
            context: { // ✏️ filling curly brackets with content
                name: booking.name,
                fecha: fecha,
                hora: hora,
                mensaje: booking.mensaje,
                cantPer: booking.cantPersonas,
                nuevo: nuevo
            },
        });
        envio=true;
        }catch(error){
            console.log('el error',error)
        }
        return envio

    }

    async sendCommentConfirmation(coment:Coment,nuevo:boolean = true) {
        console.log('envindo correo a ',coment.email)
        let envio=false;
        let fecha= moment(coment.commentDate).format('ll'); 
        try{
        await this.mailerService.sendMail({
            to: coment.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Gracias por su comentario!',
            template: './coment-crear', // `.hbs` extension is appended automatically 
            context: { // ✏️ filling curly brackets with content
                name: coment.commentedBy,
                fecha: fecha,
                mensaje: coment.content,
                nuevo: nuevo
            },
        });
        envio=true;
        }catch(error){
            console.log('el error',error)
        }
        return envio

    }
}
