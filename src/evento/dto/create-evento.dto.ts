
import { IsString, IsNumber,IsDate,IsBoolean,IsEnum,IsInstance } from 'class-validator';

export class  CreateEventoDto{

    @IsString()
    eventoId: string;

    @IsString()
    name: string;

    @IsString()
    descripcion: string;

    @IsBoolean()
    destacado: boolean;

    @IsString()
    photoURL: string;

    @IsDate()
    createdDate: any;
}