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
exports.EventoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const evento_schema_1 = require("./schemas/evento.schema");
let EventoService = class EventoService {
    constructor(model) {
        this.model = model;
    }
    async create(evento) {
        const createdObj = new this.model(evento);
        return await createdObj.save();
    }
    async update(id, evento) {
        const findObj = (await this.findEventobyId(id));
        Object.assign(findObj, evento);
        return (await findObj).save();
    }
    async getAllEventos() {
        const objList = (await this.model.find()
            .sort({ 'createdDate': -1 })
            .exec());
        console.log("Eventos encontrados", objList.length);
        return objList.map(evento => ({
            eventoId: evento.id,
            name: evento.name,
            descripcion: evento.descripcion,
            destacado: evento.destacado,
            createdDate: evento.createdDate,
            photoURL: evento.photoURL,
            datosImg: evento.datosImg,
        }));
    }
    async getEventobyId(id) {
        const evento = (await this.findEventobyId(id));
        return {
            eventoId: evento.id,
            name: evento.name,
            descripcion: evento.descripcion,
            destacado: evento.destacado,
            createdDate: evento.createdDate,
            photoURL: evento.photoURL,
            datosImg: evento.datosImg,
        };
    }
    async findEventobyId(id) {
        try {
            const evento = (await this.model.findById(id).exec());
            if (evento === null) {
                throw new common_1.BadRequestException('No existe el evento con id: ' + id);
            }
            return evento;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        const result = await this.model.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new common_1.BadRequestException('No existe el evento con id: ' + id);
        }
        return true;
    }
};
EventoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(evento_schema_1.Evento.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventoService);
exports.EventoService = EventoService;
//# sourceMappingURL=evento.service.js.map