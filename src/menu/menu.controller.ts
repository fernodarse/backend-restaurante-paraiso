import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';
import { Menu } from './schemas/menu.schema';

@Controller('menu')
export class MenuController {

    constructor(private readonly menuService: MenuService) { }

    @Get()
    async findAll(): Promise<Menu[]> {
        return this.menuService.getAllMenus();
    }

    @Post()
    async create(@Body() menudto: CreateMenuDto) {
       return this.menuService.create(menudto);
    }

    @Get('/id/:id')
    getMenu(@Param('id') menuId: string) {
        return this.menuService.getMenubyId(menuId);
    }

    @Patch(':id')
    async updateMenu(
        @Param('id') menuId: string,
        @Body() menudto: CreateMenuDto,
    ) {
        console.log('menu recibido', menudto,menuId )
        const updateMenu = await this.menuService.update(menuId, menudto);
        return updateMenu;
    }

    @Delete(':id')
    async removeMenu(@Param('id') menuId: string) {
        const isDeleted = await this.menuService.delete(menuId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Menu eliminado satifactoriamente',
            };
        }
    }

    
}
