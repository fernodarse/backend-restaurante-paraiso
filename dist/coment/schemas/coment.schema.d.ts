import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Coment extends Document {
    menuId: mongoose.Schema.Types.ObjectId;
    email: string;
    commentedBy: string;
    photoURL: string;
    content: string;
    commentDate: any;
    activo: boolean;
}
export declare const ComentSchema: mongoose.Schema<Coment, mongoose.Model<any, any, any>, undefined>;
