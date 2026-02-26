import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUrl = process.env.mongoDb_Url;

if (!mongoUrl) throw new Error("MongoDb_Url environment variable is not defined!");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToMongoDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUrl, {
        maxPoolSize: 5,               // limits simultaneous connections
        serverSelectionTimeoutMS: 5000, // fail fast
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToMongoDb;