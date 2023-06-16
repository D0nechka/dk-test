import Link from 'next/link';
import RootLayout from '@/app/layouts/layout';
import { DetailPost } from '@/app/components/DetailPost/DetailPost';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import './style.scss';

export default function DetailedPost() {
  const router = useRouter();
  const { query: { id, }, } = router;

  return (
    <RootLayout>
      <div className='detailed-post-container'>
        <DetailPost id={id} />
        <Button>
          <Link className='btn-link' href="/">
            На главную страницу
          </Link>
        </Button>
      </div>
    </RootLayout>
  );
}