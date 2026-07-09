export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginData {
  token: string;
  user: User;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: LoginData;
  errors: null;
}

export interface MeResponse {
  status: string;
  message: string;
  data: User;
  errors: null;
}