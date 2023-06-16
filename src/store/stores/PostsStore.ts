import { LIMIT } from '@/app/constants/pagination';
import { makeAutoObservable } from 'mobx';
import { IPost } from '@/app/types/post';
import { $axios } from '@/app/api/axios';

export class PostsStore {
  posts: IPost[] = [];
  isLoading = false;
  total: number = 0;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  fetchPosts(currentPage:number) {
    this.isLoading = true;
    this.error = '';
    $axios.get<IPost[]>('posts', {
      params: {
        _limit: LIMIT,
        _expand: 'user',
        _page: currentPage,
      },
    })
      .then( response => {
        this.posts = response.data;
        this.isLoading = false;
        this.total = response.headers['x-total-count'];
      }).catch((e) => this.error = e.message);
  }

  get getPosts() {
    return this.posts;
  }

  get getIsloading() {
    return this.isLoading;
  }

  get getTotal() {
    return this.total;
  }
}

export default PostsStore;
