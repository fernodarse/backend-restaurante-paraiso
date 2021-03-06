import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        //private readonly encryptionService: EncryptionService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByName(username);
        console.log('user dentro de AuthService', user);
        return  new Promise( async (resolve) => {  
            if(user !=null)  {        
            // Check the supplied password against the hash stored for this email address
            (await user).checkPassword(pass, (err, isMatch) => {
    
                if(err) throw new UnauthorizedException();
    
                if(isMatch){
                    // If there is a successful match, return the user
                    resolve(user);    
                } else {
                    resolve(null);
                }
    
            });
        }else{
            resolve(null);
        }

        });
    }

    async login(user: any) {
        const payload = { username: user.userName, sub: user.id, rol: user.rol };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

