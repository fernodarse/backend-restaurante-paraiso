"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mail_service_1 = require("./mail.service");
let MailModule = class MailModule {
};
MailModule = __decorate([
    common_1.Module({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        type: 'OAuth2',
                        user: 'lidiarosag19',
                        clientId: '197059767779-l8gcp6ocemneieqpotp7rrr2oqdq2v03.apps.googleusercontent.com',
                        clientSecret: 'xFzYQUTlGp57x3TS-S__-Jp9',
                        refreshToken: '1//04RpMwxmV7T3SCgYIARAAGAQSNwF-L9IrXWCQplccZ8VYAecWq9tt6gt6HRQz6JnLkj57AiobE8M1ODyJc_gbwKm-alGIhZf2YqM',
                        accessToken: 'ya29.a0ARrdaM-dYDQQ7g1WOptS2lDRMzVXrPwCAXtdH0qStkK3HYsrk4cM24BG1eLZaOmnbSl2eE79BSp3la1PKXkhLHQjVGJ5R52Rxc9Uufu3Y1WG_Q3wXz8AQ9YUai5qdii73e3dwY0VgGTxV2_AU_c4NDuGc0tr'
                    },
                },
                defaults: {
                    from: '"RESTAURANTE | FINCA AGROECOLOGICA EL PARAISO" <lidiarosag19@gmail.com>',
                },
                template: {
                    dir: process.cwd() + '/src/mail/templates/',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map