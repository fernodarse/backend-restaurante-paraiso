import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, user: CreateUserDto): Promise<any>;
    findOneByEmail(email: any): Promise<User>;
    findOneByUserName(userName: any): Promise<any>;
    findUserByName(userName: any): Promise<User>;
    getAllUser(): Promise<any[]>;
    delete(id: string): Promise<boolean>;
    getUserbyId(id: string): Promise<any>;
    getUserbyRedId(id: string): Promise<any>;
    findById(id: string): Promise<any>;
}
