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
exports.MenuSchema = exports.Menu = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Menu = class Menu extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Menu.prototype, "nombre", void 0);
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Menu.prototype, "categoria", void 0);
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Menu.prototype, "descripcion", void 0);
__decorate([
    mongoose_1.Prop({ type: Number, min: 0, required: true }),
    __metadata("design:type", Number)
], Menu.prototype, "precio", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Menu.prototype, "destacado", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') }),
    __metadata("design:type", Object)
], Menu.prototype, "createdDate", void 0);
__decorate([
    mongoose_1.Prop(mongoose_1.raw({
        url: { type: String, default: '' },
        name: { type: String, default: '' }
    })),
    __metadata("design:type", Object)
], Menu.prototype, "datosImg", void 0);
Menu = __decorate([
    mongoose_1.Schema()
], Menu);
exports.Menu = Menu;
exports.MenuSchema = mongoose_1.SchemaFactory.createForClass(Menu);
//# sourceMappingURL=menu.schema.js.map