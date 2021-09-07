import * as mongoose from 'mongoose';
export declare class CreateComentDto {
    menuId: mongoose.Schema.Types.ObjectId;
    email: string;
    commentedBy: string;
    photoURL: string;
    content: string;
    activo: boolean;
    commentDate: any;
}
