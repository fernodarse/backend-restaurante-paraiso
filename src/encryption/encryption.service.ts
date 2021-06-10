import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
//import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionService {
    private saltOrRounds = 100;
    constructor(/*private readonly config: ConfigService*/) {}
    
    async hash(plain: string): Promise<string> {
        return hash(plain, this.saltOrRounds)
    }

    async compare(plain: string, encrypted: string): Promise<boolean> {
        return compare(plain, encrypted)
    }
}
