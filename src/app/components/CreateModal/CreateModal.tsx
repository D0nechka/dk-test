import useAsyncEffect from '@/app/hooks/useAsyncEffect';
import { getUsers } from '@/app/services/users/getUsers';
import { IUser } from '@/app/types/user';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { createPost } from '@/app/services/posts/createPost';
import { PostCreationAttributes } from '@/app/types/post';
import './style.scss';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateModal: FC<CreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [ users, setUsers ] = useState<IUser[]>([]);
  const [ error, setError ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState(false);

  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ userId, setUserId ] = useState('');

  const handleCreatePost = async () => {
    const numUserId = Number(userId);

    const newPost: PostCreationAttributes = {
      title,
      body,
      userId: numUserId,
    };

    setIsLoading(true);
    const result = await createPost(newPost);
    setIsLoading(false);

    if(typeof result !== 'string') {
      setTitle('');
      setBody('');
      setUserId('');
      onClose();
    }
  };

  useAsyncEffect(async () => {
    setError('');
    const data = await getUsers();

    if(typeof data !== 'string') {
      setUsers(data);
    } else {
      setError(data);
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создание поста</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody className='modal-body'>
          <Input
            value={title}
            placeholder='Название поста'
            size='md'
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            value={body}
            placeholder='Описание поста'
            size='md'
            onChange={(e) => setBody(e.target.value)}
          />
          <Select
            placeholder='Выберете юзера'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            {!!error.length
              ? <Text>{error}</Text>
              : (
                users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >{user.name}</option>
                ))
              )}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Закрыть
          </Button>
          <Button variant='ghost' isLoading={isLoading} onClick={handleCreatePost}>
            Создать пост
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};