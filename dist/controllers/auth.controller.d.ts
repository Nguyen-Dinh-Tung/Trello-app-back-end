import { Request, Response } from "express";
export declare class AuthController {
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static token(req: any, res: Response): Promise<void>;
    static register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static verify(req: Request, res: Response): Promise<void>;
    static registerGoogle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: AuthController;
export default _default;
