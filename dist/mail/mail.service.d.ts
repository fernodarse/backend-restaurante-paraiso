import { MailerService } from '@nestjs-modules/mailer';
import { Booking } from 'src/booking/schemas/booking.schema';
import { User } from 'src/users/schemas/user.schema';
import { Coment } from 'src/coment/schemas/coment.schema';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<boolean>;
    sendBookingConfirmation(booking: Booking, nuevo?: boolean): Promise<boolean>;
    sendCommentConfirmation(coment: Coment, nuevo?: boolean): Promise<boolean>;
}
