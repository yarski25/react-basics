import { AxiosResponse } from 'axios';
import $api from '.';
import { IUser } from '../types/interfaces/User';

export default class AuthService {
  static fetchusers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
