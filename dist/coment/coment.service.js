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
exports.ComentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coment_schema_1 = require("./schemas/coment.schema");
const moment = require("moment");
let ComentService = class ComentService {
    constructor(comentModel) {
        this.comentModel = comentModel;
    }
    async create(coment) {
        const createdComent = new this.comentModel(coment);
        return await createdComent.save();
    }
    async update(id, coment) {
        const findObj = (await this.findComentbyId(id));
        Object.assign(findObj, coment);
        return (await findObj).save();
    }
    async getAllComents() {
        const comentList = (await this.comentModel.find()
            .sort({ 'commentDate': -1 })
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
    async getComentbyId(id) {
        const coment = (await this.findComentbyId(id));
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
    async getComentbyMenu(menuId) {
        const comentList = (await this.comentModel
            .find({ menuId: menuId })
            .sort({ 'commentDate': -1 })
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
    async findComentbyId(id) {
        try {
            const menu = (await this.comentModel.findById(id).exec());
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
        const result = await this.comentModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new common_1.BadRequestException('No existe el comentario con id: ' + id);
        }
        return true;
    }
    async getLastComent(id) {
        var finDay = new Date(moment().subtract(id, 'days').format("YYYY-MM-DD") + "T00:00:00.000Z");
        console.log('finday', finDay);
        try {
            const coment = (await this.comentModel.find({
                'commentDate': { $gte: finDay }
            })
                .sort({ 'commentDate': -1 })
                .exec());
            if (coment === null) {
                throw new common_1.BadRequestException('No existe el menu con id: ' + id);
            }
            return coment.map(coment => ({
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
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
ComentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(coment_schema_1.Coment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ComentService);
exports.ComentService = ComentService;
//# sourceMappingURL=coment.service.js.map