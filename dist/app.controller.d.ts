import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    uploadedFile(file: any): Promise<{
        originalname: any;
        filename: any;
    }>;
    seeUploadedFile(image: any, res: any): any;
}
