import { registerAs } from "@nestjs/config";

export interface RedisEnv {
  host: string;
  port: string;
  cacheTTL: number;
}
export const redis = (): RedisEnv => ({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || "6379",
  cacheTTL: 120,
});
export default registerAs("redis", redis);
