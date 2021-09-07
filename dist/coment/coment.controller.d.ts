import { HttpStatus } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { ComentService } from './coment.service';
import { CreateComentDto } from './dto/create-coment.dto';
import { Coment } from './schemas/coment.schema';
export declare class ComentController {
    private readonly comentService;
    private mailService;
    constructor(comentService: ComentService, mailService: MailService);
    findAll(): Promise<Coment[]>;
    create(menudto: CreateComentDto): Promise<any>;
    getComent(comentId: string): Promise<any>;
    getComentByMenu(menuId: string): Promise<any>;
    updateComent(comentId: string, comentdto: CreateComentDto): Promise<any>;
    removeMenu(comentId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
