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
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        let createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }
    async update(id, user) {
        console.log('buscar user', id, user);
        const findUser = (await this.findById(id));
        Object.assign(findUser, user);
        console.log('asigando', findUser);
        return (await findUser).save();
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email: email });
    }
    async findOneByUserName(userName) {
        let findUser = await this.findUserByName(userName);
        let returnUser;
        if (findUser != null) {
            returnUser = {
                userId: findUser.id,
                name: findUser.name,
                email: findUser.email,
                photoURL: findUser.photoURL,
                isActive: findUser.isActive,
                rol: findUser.rol,
                userName: findUser.userName,
                password: findUser.password,
            };
        }
        return returnUser;
    }
    async findUserByName(userName) {
        return await this.userModel.findOne({ userName: userName });
    }
    async getAllUser() {
        const list = await this.userModel.find().exec();
        list.forEach((v) => console.log(v));
        return list.map(user => ({
            userId: user.id,
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            isActive: user.isActive,
            rol: user.rol,
            userName: user.userName,
        }));
    }
    async delete(id) {
        const result = await this.userModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new common_1.BadRequestException('No existe el user con id: ' + id);
        }
        return true;
    }
    async getUserbyId(id) {
        const user = (await this.findById(id));
        return user ?
            {
                userId: user.id,
                name: user.name,
                email: user.email,
                photoURL: user.photoURL,
                isActive: user.isActive,
                rol: user.rol,
                userName: user.userName,
                password: user.password,
            } : null;
    }
    async getUserbyRedId(id) {
        const user = (await this.userModel.findOne({ redId: id }));
        return user ?
            {
                userId: user.id,
                name: user.name,
                email: user.email,
                photoURL: user.photoURL,
                isActive: user.isActive,
                rol: user.rol,
                userName: user.userName,
                password: user.password,
                redId: user.redId,
            } : null;
    }
    async findById(id) {
        try {
            const user = (await this.userModel.findById(id).exec());
            if (user === null) {
                throw new common_1.BadRequestException('No existe el user con id: ' + id);
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map