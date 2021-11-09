import RefreshToken from './interfaces/refreshToken';
export declare class AppService {
    getHello(): string;
    refreshToken(accessToken: string): Promise<RefreshToken>;
}
