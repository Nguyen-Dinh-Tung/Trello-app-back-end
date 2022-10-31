import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    readonly id: number;
    name: string;
    email: string;
    password: string;
}
