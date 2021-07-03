import jwt_decode from "jwt-decode";

export function jwtDecode(token: string) {
  return jwt_decode<{
    sub: string;
    email: string;
    role: string;
    tid: string;
    iat: number | string;
    exp: number | string;
    iss: string;
    aud: string;
  }>(token);
}
