import { Response, NextFunction } from "express";
export declare const checkToken: (req: any, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
