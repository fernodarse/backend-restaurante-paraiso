"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoModule = void 0;
const common_1 = require("@nestjs/common");
const evento_service_1 = require("./evento.service");
const evento_controller_1 = require("./evento.controller");
const mongoose_1 = require("@nestjs/mongoose");
const evento_schema_1 = require("./schemas/evento.schema");
let EventoModule = class EventoModule {
};
EventoModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: evento_schema_1.Evento.name, schema: evento_schema_1.EventoSchema }])],
        providers: [evento_service_1.EventoService],
        controllers: [evento_controller_1.EventoController]
    })
], EventoModule);
exports.EventoModule = EventoModule;
//# sourceMappingURL=evento.module.js.map