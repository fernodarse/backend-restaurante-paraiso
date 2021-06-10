import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();

  }

  async update(id: string, user: CreateUserDto) {
    console.log('buscar user', id, user)
    const findUser = (await this.findById(id));
   // console.log('encontrado', findUser)
    Object.assign(findUser, user)
    console.log('asigando', findUser)
    return (await findUser).save();
}

  async findOneByEmail(email): Promise<User> {

    return await this.userModel.findOne({ email: email });

  }

  async findOneByUserName(userName): Promise<any> {
   let findUser =await this.findUserByName(userName);
   let returnUser
   if(findUser!=null){
    returnUser= {
      userId: findUser.id,
      name: findUser.name,
      email: findUser.email,
      photoURL: findUser.photoURL,
      isActive: findUser.isActive,
      rol: findUser.rol,
      userName: findUser.userName,
      password: findUser.password,      
    }
   }
    return returnUser;
  }

  async findUserByName(userName): Promise<User> {
     return await this.userModel.findOne({ userName: userName });
  }

  async getAllUser(): Promise<any[]> {
    const list =  await this.userModel.find().exec();

    list.forEach((v)=> console.log(v) )
    return list.map(user => ({
      userId: user.id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      isActive: user.isActive,
      rol: user.rol,
      userName: user.userName,
      //password: user.password,
    }));
}

  async delete(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new BadRequestException('No existe el user con id: ' + id);
    }
    return true;
  }

  async getUserbyId(id: string): Promise<any> {
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
    }: null
  }

  async getUserbyRedId(id: string): Promise<any> {
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
      redId:user.redId,
    }: null
  }

  async findById(id: string): Promise<any> {
    try {
      const menu = (await this.userModel.findById(id).exec());

      if (menu === null) {
        throw new BadRequestException('No existe el user con id: ' + id);
      }

      return menu;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

}
