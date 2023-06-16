import { FC } from 'react';
import { Button } from '@chakra-ui/react';
import './style.scss';

interface PaginationProps {
    array: number[];
    selectItem: (el: number) => void;
    currentPage: number;
}

export const Pagination: FC<PaginationProps> = ({
  array,
  selectItem,
  currentPage,
}) => {
  return (
    <div className='pag-wrapper'>
      {
        array.map((el) =>
          <Button
            className={`${currentPage === el ? 'btn-disabled' : ''}`}
            key={el}
            onClick={() => {selectItem(el);}}
            disabled={currentPage === el}
          >
            {el}
          </Button>
        )
      }
    </div>
  );
};