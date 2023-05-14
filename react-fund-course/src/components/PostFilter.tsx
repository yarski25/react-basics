import React from 'react'
import MyInput from './ui/input/MyInput'
import MySelect from './ui/select/MySelect'

interface IFilter {
    sort: string;
    query: string;
}

type Props = {
    filter: IFilter;
    setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const PostFilter = ({filter, setFilter} : Props) => {

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const sort = e.target.value;
        setFilter({...filter, sort: sort});
    }
    
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const query = e.target.value;
        setFilter({...filter, query: query});
    }

  return (
    <div>
    <MyInput value={filter.query}
             onChange={onChangeSearch}
             type="text"
             placeholder='Searching...'/>
    <MySelect value={filter.sort}
              onChange={onChangeSelect}
              defaultValue='Сортировка'
              options={[
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}
              ]} />
    </div>
  )
}

export default PostFilter