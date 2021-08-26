import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Menu } from 'src/menu/schemas/menu.schema';

@Schema()
export class Booking extends Document {

    @Prop({ type: String, index: true, required: true })
    name: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: Date, required: true })
    date: any;

    @Prop({ type: Date, required: true })
    time: any;

    @Prop({ type: Number, required: true })
    cantPersonas: string;

    @Prop({ type: String })
    mensaje: string;

    @Prop({ type: Boolean, default: true })
    activo:boolean;

    @Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') })
    createdDate: any;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);