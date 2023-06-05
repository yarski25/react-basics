import { AxiosResponse } from 'axios';
import $api from '.';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';

export default class AuthService {
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, password });
  }
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  }
  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/logout');
  }
}
