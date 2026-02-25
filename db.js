import mongoose from "mongoose";

const mongoUrl = process.env.MongoDb_Url;

if (!mongoUrl) {
  throw new Error("MongoDb_Url environment variable is not defined!");
}

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