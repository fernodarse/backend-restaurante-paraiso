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
exports.ComentSchema = exports.Coment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const menu_schema_1 = require("../../menu/schemas/menu.schema");
let Coment = class Coment extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: menu_schema_1.Menu.name }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Coment.prototype, "menuId", void 0);
__decorate([
    mongoose_1.Prop({ type: String }),
    __metadata("design:type", String)
], Coment.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Coment.prototype, "commentedBy", void 0);
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Coment.prototype, "photoURL", void 0);
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Coment.prototype, "content", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') }),
    __metadata("design:type", Object)
], Coment.prototype, "commentDate", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Coment.prototype, "activo", void 0);
Coment = __decorate([
    mongoose_1.Schema()
], Coment);
exports.Coment = Coment;
exports.ComentSchema = mongoose_1.SchemaFactory.createForClass(Coment);
//# sourceMappingURL=coment.schema.js.map