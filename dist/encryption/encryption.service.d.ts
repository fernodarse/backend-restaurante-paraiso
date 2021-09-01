export declare class EncryptionService {
    private saltOrRounds;
    constructor();
    hash(plain: string): Promise<string>;
    compare(plain: string, encrypted: string): Promise<boolean>;
}
