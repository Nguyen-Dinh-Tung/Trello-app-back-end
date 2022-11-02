import mongoose from "mongoose";
declare const Users: mongoose.Model<{
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    email_verify?: string;
    google_id?: string;
    image?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    email_verify?: string;
    google_id?: string;
    image?: string;
}>>;
export default Users;
