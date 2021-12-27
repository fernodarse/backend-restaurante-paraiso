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
exports.EventoController = void 0;
const common_1 = require("@nestjs/common");
const create_evento_dto_1 = require("./dto/create-evento.dto");
const evento_service_1 = require("./evento.service");
let EventoController = class EventoController {
    constructor(eventoService) {
        this.eventoService = eventoService;
    }
    async findAll() {
        return this.eventoService.getAllEventos();
    }
    async create(eventodto) {
        let obj = this.eventoService.create(eventodto);
        console.log('evento creado', obj);
        return obj;
    }
    getBook(eventoId) {
        return this.eventoService.getEventobyId(eventoId);
    }
    async updateBook(eventoId, eventodto) {
        console.log('evento recibido', eventodto, eventoId);
        const updateObj = await this.eventoService.update(eventoId, eventodto);
        console.log('evento modificado', updateObj);
        return updateObj;
    }
    async removeBook(eventoId) {
        const isDeleted = await this.eventoService.delete(eventoId);
        if (isDeleted) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Evento eliminado satifactoriamente',
            };
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evento_dto_1.CreateEventoDto]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "create", null);
__decorate([
    common_1.Get('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventoController.prototype, "getBook", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_evento_dto_1.CreateEventoDto]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "updateBook", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "removeBook", null);
EventoController = __decorate([
    common_1.Controller('evento'),
    __metadata("design:paramtypes", [evento_service_1.EventoService])
], EventoController);
exports.EventoController = EventoController;
//# sourceMappingURL=evento.controller.js.map