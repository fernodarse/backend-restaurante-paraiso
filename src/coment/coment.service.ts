import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateComentDto } from './dto/create-coment.dto';
import { Coment } from './schemas/coment.schema';

@Injectable()
export class ComentService {

    constructor(@InjectModel(Coment.name) private comentModel: Model<Coment>) { }

    async create(coment: CreateComentDto) {
        const createdComent = new this.comentModel(coment);
        return await createdComent.save();
    }

    async update(id: string, coment: CreateComentDto) {
        //console.log('buscar coment', id, coment)
        const findObj = (await this.findComentbyId(id));
       // console.log('encontrado', findObj)
        Object.assign(findObj, coment)
        //console.log('asigando', findObj)
        return (await findObj).save();
    }

    async getAllComents(): Promise<any[]> {
        //orderBy('createdDate', 'desc'))
        const comentList = (await this.comentModel.find()
        .sort({ 'commentDate' : -1 } )//desc, 1 - asc
        .populate('menu')
        .exec());
        return comentList.map(coment => ({
            commentId: coment.id,
            menuId: coment.menuId,
            email: coment.email,
            commentedBy: coment.commentedBy,
            photoURL: coment.photoURL,
            content: coment.content,
            commentDate: coment.commentDate,
            activo: coment.activo,
        }));
    }

    async getComentbyId(id: string): Promise<any> {
        const coment =   (await this.findComentbyId(id));
        return {
            commentId: coment.id,
            menuId: coment.menu,
            email: coment.email,
            commentedBy: coment.commentedBy,
            photoURL: coment.photoURL,
            content: coment.content,
            commentDate: coment.commentDate,
            activo: coment.activo,
        };
    }

    async getComentbyMenu(menuId): Promise<any> {
        const comentList =   (await this.comentModel
            .find({menuId:menuId})
            .sort({ 'commentDate' : -1 } )
            .exec());
        return comentList.map(coment => ({
            commentId: coment.id,
            menuId: coment.menuId,
            email: coment.email,
            commentedBy: coment.commentedBy,
            photoURL: coment.photoURL,
            content: coment.content,
            commentDate: coment.commentDate,
            activo: coment.activo,
        }));
    }

    async findComentbyId(id: string): Promise<any> {
        try {
            const menu = (await this.comentModel.findById(id).exec());

            if (menu === null) {
                throw new BadRequestException('No existe el menu con id: ' + id);
            }

            return menu;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async delete(id: string) {
        const result = await this.comentModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new BadRequestException('No existe el comentario con id: ' + id);
        }
        return true;
    }
}
