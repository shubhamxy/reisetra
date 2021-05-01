import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default function toJson(fileName: string): string | object | number {
  return yaml.load(readFileSync(join(fileName), 'utf8'));
};
