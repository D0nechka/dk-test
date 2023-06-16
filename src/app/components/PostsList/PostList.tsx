import rootStore from '@/store/rootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Post } from '../Post/Post';
import { Pagination } from '../Pagination/Pagination';
import { Spinner, Text } from '@chakra-ui/react';
import { getArray } from '@/app/utils/getArray';
import { QueryRouterType } from '@/app/types/quey';
import './style.scss';

interface PostsListProps {
  changeQueryRouter: (query: QueryRouterType) => void;
  page: number;
}

export const PostsList: FC<PostsListProps> = observer(({
  changeQueryRouter,
  page,
}) => {
  const [ currentPage, setCurrentPage ] = useState(1);

  const posts = rootStore.postsStore.getPosts;
  const isLoading = rootStore.postsStore.getIsloading;
  const total = rootStore.postsStore.getTotal;

  const handleSelectItem = (el: number) => {
    changeQueryRouter({
      page: el,
    });

    setCurrentPage(el);
  };

  useEffect(() => {
    rootStore.postsStore.fetchPosts(currentPage);
  },[ currentPage ]);

  useEffect(() => {
    setCurrentPage(page);
  },[ page ]);

  if(isLoading) {
    return (
      <div className='post-list-loading'>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className='post-list'>
        {!!posts.length ? posts.map((el) =>
          <Post
            key={el.id}
            title={el.title}
            userName={el.user.name}
            id={el.id}
          />
        ) : (
          <div className='empty'>
            <Text>Ничего не найдено</Text>
          </div>
        )}
      </div>
      <Pagination
        selectItem={handleSelectItem}
        currentPage={currentPage}
        array={getArray(total)}
      />
    </div>
  );
});
