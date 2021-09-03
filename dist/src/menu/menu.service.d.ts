import { Model } from 'mongoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './schemas/menu.schema';
export declare class MenuService {
    private menuModel;
    constructor(menuModel: Model<Menu>);
    create(menu: CreateMenuDto): Promise<Menu>;
    update(id: string, menu: CreateMenuDto): Promise<any>;
    getAllMenus(): Promise<any[]>;
    getMenubyId(id: string): Promise<any>;
    findMenubyId(id: string): Promise<any>;
    delete(id: string): Promise<boolean>;
}
