import { registerAs } from "@nestjs/config";

export interface DBEnv {
  type: string;
  host: string;
  port: string | number;
  username: string;
  password: string;
  database: string;
  url: string;
  user: string;
  db: string;
}

export const db = (): DBEnv => ({
  type: process.env.DB_TYPE || "mysql2",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "test",
  url: process.env.DATABASE_URL,
  user: process.env.POSTGRES_USER,
  db: process.env.POSTGRES_DB,
});

export default registerAs("db", db);
