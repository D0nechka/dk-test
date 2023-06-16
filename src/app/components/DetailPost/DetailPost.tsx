import { FC, useState } from 'react';
import useAsyncEffect from '@/app/hooks/useAsyncEffect';
import { getPost } from '@/app/services/posts/getPost';
import {
  Heading,
  Text,
  CardBody,
  Card,
  Image,
  CardHeader,
  Flex,
  Avatar,
  Box
} from '@chakra-ui/react';
import { IPost } from '@/app/types/post';
import './style.scss';

interface DetailPostProps {
  id?: string | string[];
}

export const DetailPost: FC<DetailPostProps> = ({
  id,
}) => {
  const [ currentPost, setCurrentPost ] = useState<IPost>();
  const [ error, setError ] = useState<string>('');

  useAsyncEffect(async () => {
    const numId = Number(id);

    if(numId) {
      setError('');
      const data = await getPost(numId);

      if(typeof data !== 'string') {
        setCurrentPost(data);
      } else {
        setError(data);
      }
    } else {
      setError('Не корректный айди');
    }
  }, [ id ]);

  if(!!error.length) {
    return (
      <div className='error-post'>
        <Text>{error}</Text>
      </div>
    );
  }

  return (
    <Card maxW='md'>
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            <Box>
              <Heading size='sm'>{currentPost?.user?.name}</Heading>
              <Text>{currentPost?.title}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {currentPost?.body}
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src='https://loremflickr.com/1280/1280'
        alt='Post'
      />
    </Card>
  );
};