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
exports.BookingSchema = exports.Booking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const menu_schema_1 = require("../../menu/schemas/menu.schema");
let Booking = class Booking extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ type: String, index: true, required: true }),
    __metadata("design:type", String)
], Booking.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], Booking.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, required: true }),
    __metadata("design:type", Object)
], Booking.prototype, "date", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, required: true }),
    __metadata("design:type", Object)
], Booking.prototype, "time", void 0);
__decorate([
    mongoose_1.Prop({ type: Number, required: true }),
    __metadata("design:type", String)
], Booking.prototype, "cantPersonas", void 0);
__decorate([
    mongoose_1.Prop({ type: String }),
    __metadata("design:type", String)
], Booking.prototype, "mensaje", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Booking.prototype, "activo", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: new Date('MM-dd-yyyy HH:mm') }),
    __metadata("design:type", Object)
], Booking.prototype, "createdDate", void 0);
Booking = __decorate([
    mongoose_1.Schema()
], Booking);
exports.Booking = Booking;
exports.BookingSchema = mongoose_1.SchemaFactory.createForClass(Booking);
//# sourceMappingURL=booking.schema.js.map