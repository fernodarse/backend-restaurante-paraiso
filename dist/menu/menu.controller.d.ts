import { HttpStatus } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';
import { Menu } from './schemas/menu.schema';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    findAll(): Promise<Menu[]>;
    create(menudto: CreateMenuDto): Promise<Menu>;
    getMenu(menuId: string): Promise<any>;
    updateMenu(menuId: string, menudto: CreateMenuDto): Promise<any>;
    removeMenu(menuId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
