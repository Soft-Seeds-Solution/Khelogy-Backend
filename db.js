import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUrl = process.env.mongoDb_Url;

// global cache for serverless (Vercel)
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToMongoDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUrl).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null; // reset if connection fails
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToMongoDb;