import { IsBoolean, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string; 
    
    @IsString()
    photoURL: string;
    
    @IsBoolean()
    isActive: boolean;

    @IsString()
    rol: string;

    @IsString()
    userName: string;

    @IsString()
    password: string;

    @IsString()
    redId:string;
}