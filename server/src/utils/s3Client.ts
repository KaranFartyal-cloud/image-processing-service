import { S3Client } from "@aws-sdk/client-s3";
import { configDotenv } from "dotenv";

configDotenv();

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET!,
  },
});
