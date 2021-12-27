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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoSchema = exports.Evento = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Evento = class Evento extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Evento.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], Evento.prototype, "descripcion", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Evento.prototype, "destacado", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') }),
    __metadata("design:type", Object)
], Evento.prototype, "createdDate", void 0);
__decorate([
    mongoose_1.Prop({ type: String }),
    __metadata("design:type", String)
], Evento.prototype, "photoURL", void 0);
__decorate([
    mongoose_1.Prop(mongoose_1.raw({
        url: { type: String, default: '' },
        name: { type: String, default: '' }
    })),
    __metadata("design:type", Object)
], Evento.prototype, "datosImg", void 0);
Evento = __decorate([
    mongoose_1.Schema()
], Evento);
exports.Evento = Evento;
exports.EventoSchema = mongoose_1.SchemaFactory.createForClass(Evento);
exports.EventoSchema.pre('validate', function (next) {
    console.log("Pre validate called", this.photoURL, this.datosImg);
    if (this.photoURL == '' && this.datosImg.url == '') {
        console.log("reportando error 1");
        next(new Error('Debe seleccionar una imagen'));
    }
    else {
        next();
    }
});
exports.EventoSchema.pre('save', function (next) {
    console.log("Pre save called", this.photoURL, this.datosImg);
    if (this.photoURL == '' && this.datosImg.url == '') {
        console.log("reportando error 2");
        next(new Error('Debe seleccionar una imagen'));
    }
    else {
        next();
    }
});
//# sourceMappingURL=evento.schema.js.map