import mongoose from "mongoose";

async function setupDns() {
  if (typeof window === "undefined") {
    const dns = await import("dns");
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
  }
}

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/grocery_shop";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  await setupDns();

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default dbConnect;
