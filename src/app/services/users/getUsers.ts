import { $axios } from '@/app/api/axios';
import { IUser } from '@/app/types/user';

export const getUsers = async (): Promise<IUser[] | string> => {
  try {
    const response = await $axios.get<IUser[]>('users');

    return response.data;
  } catch(e) {
    return 'Не удалось получить пользователей';
  }
};