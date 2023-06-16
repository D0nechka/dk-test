import { $axios } from '@/app/api/axios';
import { IPost } from '@/app/types/post';

export const getPost = async (id: number): Promise<IPost | string> => {
  try {
    const response = await $axios.get<IPost[]>('posts', {
      params: {
        id,
        _expand: 'user',
      },
    });

    if(!response.data.length) {

      throw new Error('12321');
    }

    return response.data[0];
  } catch (e) {
    return 'Ошибка получения поста';
  }
};