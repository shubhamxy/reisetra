import { get, put } from "../../utils/http";

export interface UserProfile {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  dateOfBirth: Date;
  phone: string;
  avatar: string;
  oauthId: string;
  oauthProvider: 'GOOGLE';
  role: 'USER' | 'ADMIN';
  bio: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function getMe() {
  return get<Partial<UserProfile>>('user/me')
}

export function updateMe(body: Partial<UserProfile>) {
  return put<Partial<UserProfile>, Partial<UserProfile>>('user/me', body)
}
