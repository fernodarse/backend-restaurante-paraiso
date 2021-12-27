"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const menu_module_1 = require("./menu/menu.module");
const platform_express_1 = require("@nestjs/platform-express");
const evento_module_1 = require("./evento/evento.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const coment_module_1 = require("./coment/coment.module");
const booking_module_1 = require("./booking/booking.module");
const mail_module_1 = require("./mail/mail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://admin:admin123@localhost/restaurante-paraiso'),
            platform_express_1.MulterModule.register({ dest: './files', }),
            menu_module_1.MenuModule,
            evento_module_1.EventoModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            coment_module_1.ComentModule,
            booking_module_1.BookingModule,
            mail_module_1.MailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map