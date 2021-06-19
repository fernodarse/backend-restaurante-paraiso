
import { IsString, IsNumber,IsDate,IsBoolean,IsEnum,IsInstance } from 'class-validator';
import * as mongoose from 'mongoose';

export class  CreateComentDto{

    menuId: mongoose.Schema.Types.ObjectId;

    @IsString()
    email: string;

    @IsString()
    commentedBy: string;

    @IsString()    
    photoURL: string;

    @IsString()
    content: string;

    @IsBoolean()
    activo: boolean;

    @IsDate()
    commentDate: any;

}