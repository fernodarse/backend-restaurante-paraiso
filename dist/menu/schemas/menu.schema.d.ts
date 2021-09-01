import { Document } from 'mongoose';
export declare class Menu extends Document {
    nombre: string;
    categoria: string;
    descripcion: string;
    precio: number;
    destacado: boolean;
    createdDate: any;
    datosImg: Record<string, any>;
}
export declare const MenuSchema: import("mongoose").Schema<Menu, import("mongoose").Model<any, any, any>, undefined>;
