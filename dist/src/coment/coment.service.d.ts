import { Model } from 'mongoose';
import { CreateComentDto } from './dto/create-coment.dto';
import { Coment } from './schemas/coment.schema';
export declare class ComentService {
    private comentModel;
    constructor(comentModel: Model<Coment>);
    create(coment: CreateComentDto): Promise<Coment>;
    update(id: string, coment: CreateComentDto): Promise<any>;
    getAllComents(): Promise<any[]>;
    getComentbyId(id: string): Promise<any>;
    getComentbyMenu(menuId: any): Promise<any>;
    findComentbyId(id: string): Promise<any>;
    delete(id: string): Promise<boolean>;
}
