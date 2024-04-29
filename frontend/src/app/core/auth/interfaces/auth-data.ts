export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface User {
  username: string;
  email: string;
}