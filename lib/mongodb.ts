import mongoose from 'mongoose';

// Define the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global type augmentation for mongoose connection caching
 * This prevents TypeScript errors when accessing global.mongoose
 */
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

/**
 * Global cache object for the MongoDB connection
 * In development, Next.js hot reloads can create new connections on each reload
 * This cache persists across hot reloads to prevent connection exhaustion
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and returns a cached MongoDB connection
 * @returns Promise that resolves to a Mongoose Connection instance
 */
async function connectDB(): Promise<mongoose.Connection> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if one doesn't exist
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable Mongoose buffering to fail fast on connection issues
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, options)
      .then((mongooseInstance) => {
        return mongooseInstance.connection;
      });
  }

  try {
    // Wait for connection to complete and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the promise cache on error to allow retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
