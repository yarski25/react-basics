import React from 'react'
import { getPagesArray } from '../../../utils/pages';

type MyPaginationProps = {
    totalPages: number;
    page: number;
    changePage: (page: number) => void;
}

const MyPagination = (props: MyPaginationProps) => {
  let pagesArray = getPagesArray(props.totalPages);
  return (
    <div className='page'>
        {pagesArray.map( (p) => 
        <span
          onClick={() => props.changePage(p)} 
          key={p}
          className={props.page === p ? 'page__item page__item-current' : 'page__item'}>
          {p}
        </span>
    )}
  </div>
  )
}

export default MyPagination