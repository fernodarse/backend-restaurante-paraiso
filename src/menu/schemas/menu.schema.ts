import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Menu extends Document {

    @Prop({ type: String, index: true, required: true })
    nombre: string;

    @Prop({ type: String, index: true, required: true })
    categoria: string;

    @Prop({ type: String, index: true, required: true })
    descripcion: string;

    @Prop({ type: Number, min: 0, required: true })
    precio: number;

    @Prop({ type: Boolean, default: false })
    destacado: boolean;

    @Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') })
    createdDate: any;

    @Prop(raw({
        url: { type: String, default: '' },
        name: { type: String, default: '' }
    }))
    datosImg: Record<string, any>;

}



export const MenuSchema = SchemaFactory.createForClass(Menu);