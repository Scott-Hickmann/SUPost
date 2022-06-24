import mongoose, { Document } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

interface Global {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as unknown as Global).mongoose;

if (!cached) {
  cached = (global as unknown as Global).mongoose = {
    conn: null,
    promise: null
  };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Doc<T> = Document<any, any, T> & T;

export function documentToObject<T>(document: Doc<T>): T & { id: string } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object = document.toObject() as any;
  if (object.createdAt) object.createdAt = object.createdAt.toISOString();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...rest } = object;
  rest.id = _id.toString();
  return rest as T & { id: string };
}
