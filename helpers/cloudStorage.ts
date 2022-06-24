import { Storage } from '@google-cloud/storage';

export const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  }
});

export const bucket = storage.bucket(String(process.env.GOOGLE_BUCKET_NAME));
