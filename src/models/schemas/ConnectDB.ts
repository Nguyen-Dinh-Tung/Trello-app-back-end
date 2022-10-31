import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export class ConnectDB {
  async connect() {
    await mongoose.connect(process.env.MONGODB_URL);
  }
}
