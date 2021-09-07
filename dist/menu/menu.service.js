"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const menu_schema_1 = require("./schemas/menu.schema");
let MenuService = class MenuService {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }
    async create(menu) {
        const createdMenu = new this.menuModel(menu);
        return await createdMenu.save();
    }
    async update(id, menu) {
        const findMenu = (await this.findMenubyId(id));
        Object.assign(findMenu, menu);
        return (await findMenu).save();
    }
    async getAllMenus() {
        const menuList = (await this.menuModel.find()
            .sort({ 'createdDate': -1 })
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
    async getMenubyId(id) {
        const menu = (await this.findMenubyId(id));
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
    async findMenubyId(id) {
        try {
            const menu = (await this.menuModel.findById(id).exec());
            if (menu === null) {
                throw new common_1.BadRequestException('No existe el menu con id: ' + id);
            }
            return menu;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        const result = await this.menuModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new common_1.BadRequestException('No existe el menu con id: ' + id);
        }
        return true;
    }
};
MenuService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(menu_schema_1.Menu.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map