import mongoose from "mongoose";
declare const BroadModels: mongoose.Model<{
    title?: string;
    mode?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    title?: string;
    mode?: string;
}>>;
export default BroadModels;
