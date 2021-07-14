import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';

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
}
