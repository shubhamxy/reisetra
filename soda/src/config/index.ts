import toJson from "src/utils/yaml";
export const config = toJson(__dirname + "/../config.yml");
export const PORT = process.env.PORT || '8000'
export const SECRET = process.env.SECRET || 'secretisthis'
export const API_PREFIX = 'api/v1'
export const API_VERSION = process.env.API_VERSION || '0.0.0'
