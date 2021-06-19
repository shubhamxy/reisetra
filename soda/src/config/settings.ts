import { registerAs } from "@nestjs/config";
export interface SettingsEnv {
  throttle: {
    limit: number;
    ttl: number;
  };
}
export const settings = (): SettingsEnv => ({
  throttle: {
    limit: +process.env.THROTTLE_LIMIT || 60,
    ttl: +process.env.THROTTLE_TTL || 120,
  },
});
export default registerAs("settings", settings);
