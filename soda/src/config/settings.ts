import { registerAs } from '@nestjs/config';
export interface SettingsEnv {}
export const settings = (): SettingsEnv => ({});
export default registerAs('settings', settings);
