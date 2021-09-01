import { Document } from 'mongoose';
export declare class Evento extends Document {
    name: string;
    descripcion: string;
    destacado: boolean;
    createdDate: any;
    photoURL: string;
}
export declare const EventoSchema: import("mongoose").Schema<Evento, import("mongoose").Model<any, any, any>, undefined>;
