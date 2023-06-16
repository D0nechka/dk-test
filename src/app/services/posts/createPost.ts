import { $axios } from '@/app/api/axios';
import { IPost, PostCreationAttributes } from '@/app/types/post';

export const createPost = async (post: PostCreationAttributes): Promise<IPost | string> => {
  try {
    const response = await $axios.post<IPost>('posts', post, {
      params: {
        _expand: 'user',
      },
    });

    return response.data;
  } catch (error) {
    return 'Не удалось создать пост';
  }
};
