import { LIMIT } from '../constants/pagination';

export const getArray = (total: number) => {
  return Array.from({ length: total / LIMIT, }, (_, index) => index + 1);
};