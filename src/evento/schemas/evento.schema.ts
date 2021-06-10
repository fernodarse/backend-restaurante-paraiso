import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Evento extends Document {

    @Prop({ type: String, index: true, required: true })
    name: string;

    @Prop({ type: String, required: true })
    descripcion: string;

    @Prop({ type: Boolean, default: false })
    destacado: boolean;

    @Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') })
    createdDate: any;

    @Prop({ type: String, required: true })
    photoURL: string;

}



export const EventoSchema = SchemaFactory.createForClass(Evento);