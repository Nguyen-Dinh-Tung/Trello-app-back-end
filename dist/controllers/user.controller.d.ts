import { Request, Response } from "express";
declare class UserController {
    UserRepo: any;
    constructor();
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    verify: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
