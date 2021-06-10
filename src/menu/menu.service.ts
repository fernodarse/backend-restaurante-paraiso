import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
import { Model } from 'mongoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './schemas/menu.schema';

@Injectable()
export class MenuService {

    constructor(@InjectModel(Menu.name) private menuModel: Model<Menu>) { }

    async create(menu: CreateMenuDto) {
        const createdMenu = new this.menuModel(menu);
        return await createdMenu.save();
    }

    async update(id: string, menu: CreateMenuDto) {
        //console.log('buscar menu', id, menu)
        const findMenu = (await this.findMenubyId(id));
       // console.log('encontrado', findMenu)
        Object.assign(findMenu, menu)
        //console.log('asigando', findMenu)
        return (await findMenu).save();
    }

    async getAllMenus(): Promise<any[]> {
        //orderBy('createdDate', 'desc'))
        const menuList = (await this.menuModel.find()
        .sort({ 'createdDate' : -1 } )//desc, 1 - asc
        .exec());
        return menuList.map(menu => ({
            menuId: menu.id,
            nombre: menu.nombre,
            categoria: menu.categoria,
            descripcion: menu.descripcion,
            precio: menu.precio,
            destacado: menu.destacado,
            createdDate: menu.createdDate,
            datosImg: menu.datosImg,
        }));
    }

    async getMenubyId(id: string): Promise<any> {
        const menu =   (await this.findMenubyId(id));
        return {
            menuId: menu.id,
            nombre: menu.nombre,
            categoria: menu.categoria,
            descripcion: menu.descripcion,
            precio: menu.precio,
            destacado: menu.destacado,
            createdDate: menu.createdDate,
            datosImg: menu.datosImg,
        };
    }

    async findMenubyId(id: string): Promise<any> {
        try {
            const menu = (await this.menuModel.findById(id).exec());

            if (menu === null) {
                throw new BadRequestException('No existe el menu con id: ' + id);
            }

            return menu;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async delete(id: string) {
        const result = await this.menuModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new BadRequestException('No existe el menu con id: ' + id);
        }
        return true;
    }



}
