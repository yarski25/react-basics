import { AxiosResponse } from 'axios';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';
import $api from '.';

export default class authAPI {
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, password });
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }
}
