import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Booking extends Document {
    name: string;
    email: string;
    date: any;
    time: any;
    cantPersonas: string;
    mensaje: string;
    activo: boolean;
    createdDate: any;
}
export declare const BookingSchema: mongoose.Schema<Booking, mongoose.Model<any, any, any>, undefined>;
