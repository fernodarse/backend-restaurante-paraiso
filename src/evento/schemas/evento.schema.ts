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

    @Prop({ type: String })
    photoURL: string;

    @Prop(raw({
        url: { type: String, default: '' },
        name: { type: String, default: '' }
    }))
    datosImg: Record<string, any>;
}



export const EventoSchema = SchemaFactory.createForClass(Evento);

EventoSchema.pre('validate', function(next) { 
    //console.log("Pre validate called",this.photoURL, this.datosImg);   
    if (this.photoURL == '' && this.datosImg.url == '') {
        next(new Error('Debe seleccionar una imagen'));
    } else {
        next();
    }
})