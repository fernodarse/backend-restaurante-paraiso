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
exports.ComentController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail/mail.service");
const coment_service_1 = require("./coment.service");
const create_coment_dto_1 = require("./dto/create-coment.dto");
let ComentController = class ComentController {
    constructor(comentService, mailService) {
        this.comentService = comentService;
        this.mailService = mailService;
    }
    async findAll() {
        return this.comentService.getAllComents();
    }
    async create(menudto) {
        let respuesta;
        try {
            let obj = (await this.comentService.create(menudto));
            let envioCorreo = (await this.mailService.sendCommentConfirmation(obj));
            envioCorreo ?
                respuesta = {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Su comentario se ha registrado correctamente',
                    entity: obj,
                }
                :
                    respuesta = {
                        statusCode: common_1.HttpStatus.OK,
                        message: 'El comentario se ha registado,no ha podido ser notificado por correo',
                        entity: obj,
                    };
            console.log('Comentario creado', obj);
        }
        catch (error) {
            console.log(error);
            respuesta = {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: 'Ha ocurrido un error, intentelo más tarde',
            };
        }
        return respuesta;
    }
    getComent(comentId) {
        return this.comentService.getComentbyId(comentId);
    }
    getComentByMenu(menuId) {
        return this.comentService.getComentbyMenu(menuId);
    }
    async updateComent(comentId, comentdto) {
        console.log('menu recibido', comentdto, comentId);
        const updateComent = await this.comentService.update(comentId, comentdto);
        return updateComent;
    }
    async removeMenu(comentId) {
        const isDeleted = await this.comentService.delete(comentId);
        if (isDeleted) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Menu eliminado satifactoriamente',
            };
        }
    }
    getLastComent(dia) {
        console.log('buscando ', dia);
        return this.comentService.getLastComent(dia);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coment_dto_1.CreateComentDto]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "create", null);
__decorate([
    common_1.Get('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComentController.prototype, "getComent", null);
__decorate([
    common_1.Get('/coment/menu/:idMenu'),
    __param(0, common_1.Param('idMenu')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComentController.prototype, "getComentByMenu", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_coment_dto_1.CreateComentDto]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "updateComent", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComentController.prototype, "removeMenu", null);
__decorate([
    common_1.Get('/last/:dia'),
    __param(0, common_1.Param('dia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ComentController.prototype, "getLastComent", null);
ComentController = __decorate([
    common_1.Controller('coment'),
    __metadata("design:paramtypes", [coment_service_1.ComentService,
        mail_service_1.MailService])
], ComentController);
exports.ComentController = ComentController;
//# sourceMappingURL=coment.controller.js.map