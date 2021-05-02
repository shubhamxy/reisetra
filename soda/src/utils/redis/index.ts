export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export function getRefreshTokenKey(id: string) {
  return `${REFRESH_TOKEN}_${id}`;
}
