import { Document } from 'mongoose';
export declare class User extends Document {
    name: string;
    email: string;
    photoURL: string;
    isActive: boolean;
    rol: string;
    userName: string;
    password: string;
    redId: string;
    checkPassword: Function;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<any, any, any>, undefined>;
