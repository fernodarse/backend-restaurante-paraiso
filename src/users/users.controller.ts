import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.getAllUser();
    }

    @Post()
    async create(@Body() userdto: CreateUserDto) {
        console.log('recibido', userdto);
        let u= this.usersService.create(userdto);
        u.then((u2)=> console.log(u2));
       return u
    }

    @Get('/id/:id')
    getUserbyId(@Param('id') userId: string) {
        return this.usersService.getUserbyId(userId);
    }

    @Get('/red/id/:id')
    getUserbyRedId(@Param('id') userId: string) {
        return this.usersService.getUserbyRedId(userId);
    }

    @Get('/username/:username')
    getUserbyName(@Param('username') username: string) {
        return this.usersService.findOneByUserName(username);
    }

    @Patch(':id')
    async updateMenu(
        @Param('id') userId: string,
        @Body() userdto: CreateUserDto,
    ) {
        console.log('user recibido', userdto,userId )
        const updateUser = await this.usersService.update(userId, userdto);
        return updateUser;
    }

    @Delete(':id')
    async removeMenu(@Param('id') userId: string) {
        const isDeleted = await this.usersService.delete(userId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Menu eliminado satifactoriamente',
            };
        }
    }
   
   
   
    /* @Post() 
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute(){
        return {
            message: 'You did it!'
        }
    }*/

}
