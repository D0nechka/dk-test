import { PostsList } from '@/app/components/PostsList/PostList';
import RootLayout from '@/app/layouts/layout';
import { useRouter } from 'next/router';
import { QueryRouterType } from '@/app/types/quey';
import { CreateModal } from '@/app/components/CreateModal/CreateModal';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import '../styles/globals.scss';

export default function Main() {
  const router = useRouter();
  const { query: { page, }, } = router;

  const changeQueryRouter = (query: QueryRouterType) => {
    router.push({
      query,
    });
  };

  const [ isOpenModal, setIsOpenModal ] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <RootLayout>
      <CreateModal onClose={handleCloseModal} isOpen={isOpenModal} />
      <div>
        <Button
          onClick={handleOpenModal}
        >Создать пост</Button>
        <PostsList
          page={Number(page) ? Number(page) : 1}
          changeQueryRouter={changeQueryRouter}
        />
      </div>
    </RootLayout>
  );
}
