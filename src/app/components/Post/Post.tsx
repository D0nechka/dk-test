import { FC, useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter } from '@chakra-ui/react';
import Link from 'next/link';
import './style.scss';

type PostProps = {
  title:string;
  userName:string;
  id: number;
}

export const Post:FC<PostProps> = (props) => {
  const { title, userName, id, } = props;

  const [ isLoad, setIsLoad ] = useState(false);

  return (
    <div className='post'>
      <Card maxW='300px'>
        <CardBody>
          <Image
            src='https://loremflickr.com/1280/1280'
            alt='random photo'
            borderRadius='lg'
            className={isLoad ? '' : 'img-blure'}
            onLoad={() => setIsLoad(true)}
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
            <Text>
              {userName}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link href={`/detailedPost/${id}`}>click to full view</Link>
        </CardFooter>
      </Card>
    </div>
  );
};