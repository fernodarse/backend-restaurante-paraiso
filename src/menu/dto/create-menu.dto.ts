
import { IsString, IsNumber,IsDate,IsBoolean,IsEnum,IsInstance } from 'class-validator';

export class  CreateMenuDto{

    @IsString()
    menuId: string;

    @IsString()
    nombre: string;

    //@IsEnum()
    @IsString()    
    categoria: string;

    @IsString()
    descripcion: string;

    @IsNumber()
    precio: number;

    @IsBoolean()
    destacado: boolean;

    @IsDate()
    createdDate: any;

   /* @Prop(raw({
        url: { type: String, default: '' },
        name: { type: String, default: '' }
    }))
        url: { type: String, default: '' },*/

    //@IsInstance(value: {url: '', name:''} )
    datosImg: {  url:String, name: String  };

}