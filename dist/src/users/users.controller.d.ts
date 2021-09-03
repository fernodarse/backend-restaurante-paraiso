import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    create(userdto: CreateUserDto): Promise<User>;
    getUserbyId(userId: string): Promise<any>;
    getUserbyRedId(userId: string): Promise<any>;
    getUserbyName(username: string): Promise<any>;
    updateMenu(userId: string, userdto: CreateUserDto): Promise<any>;
    removeMenu(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
