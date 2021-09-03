import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Menu } from '../../menu/schemas/menu.schema';

@Schema()
export class Coment extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: Menu.name })
    menuId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String, index: true, required: true })
    commentedBy: string;

    @Prop({ type: String, index: true, required: true })
    photoURL: string;

    @Prop({ type: String, index: true, required: true })
    content: string;

    @Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') })
    commentDate: any;

    @Prop({ type: Boolean, default: true })
    activo:boolean;
}

export const ComentSchema = SchemaFactory.createForClass(Coment);