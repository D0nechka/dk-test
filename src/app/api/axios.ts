import axios from 'axios';

export const $axios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});