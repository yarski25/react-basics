import axios from 'axios';
import { IPhotoItem } from '../types/interfaces/PhotoItem';

export default class PhotoService {
  static async getAll(limit: number, page: number) {
    const response = await axios.get<IPhotoItem[]>('https://jsonplaceholder.typicode.com/photos', {
      params: {
        _limit: limit,
        _page: page,
      },
    });
    return response;
  }

  static async getById(id: number) {
    const response = await axios.get<IPhotoItem>(
      'https://jsonplaceholder.typicode.com/photos/' + id,
    );

    return response;
  }
}
