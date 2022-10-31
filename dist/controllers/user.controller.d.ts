import { Request, Response } from "express";
export declare class UserController {
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static verify(req: Request, res: Response): Promise<void>;
}
declare const _default: UserController;
export default _default;
