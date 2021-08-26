
import { IsString, IsNumber,IsDate,IsBoolean,IsEnum,IsInstance } from 'class-validator';

export class  CreateBookingDto{

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsDate()
    date: any;

    @IsDate()
    time: any;

    @IsNumber()
    cantPersonas: string;

    @IsString()
    mensaje: string;

    @IsBoolean()
    activo:boolean;

    @IsDate()
    createdDate: any;

    @IsString()
    userId: string;
}