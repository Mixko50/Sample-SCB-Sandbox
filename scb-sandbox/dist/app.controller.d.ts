import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(req: any, res: any): void;
    getAutorization(req: any, res: any): void;
    getToken(req: any, res: any): Promise<void>;
    createQr(req: any, res: any): Promise<void>;
    callback(req: any, res: any): void;
    getStatus(req: any, res: any): void;
    getClear(req: any, res: any): void;
}