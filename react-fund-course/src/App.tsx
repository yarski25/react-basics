import React, { useRef, useState } from 'react';
import './App.scss';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostList from './components/PostList';
import { IPostItem } from './interfaces/PostItem';
import MyButton from './components/ui/button/MyButton';
import MyInput from './components/ui/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/ui/select/MySelect';

function App() {

  const[posts, setPosts] = useState<IPostItem[]>([
    {id: 1, title: 'JavaScript', body: 'JavaScript - язык програмирования'},
    {id: 2, title: 'TypeScript', body: 'TypeScript - язык програмирования'},
    {id: 3, title: 'NodeJS', body: 'NodeJS - язык програмирования'}
  ])

  const [selectedSort, setSelectedSort] = useState('');

  // methods
  const createPost = (newPost : IPostItem) =>{
    setPosts([...posts, newPost]);
  }

  const removePost = (post : IPostItem) =>{
    setPosts(posts.filter(p => p.id !== post.id));
  }

  // const sortPosts = (sort : string) =>{
  //   setSelectedSort(sort);
  //   console.log(sort);
  // }

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>{
      const sort = e.target.value;
      setSelectedSort(sort);
      console.log(sort)
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin: '1em 0'}} />
      <div>
        <MySelect value={selectedSort}
                  onChange={onChangeSelect}
                  defaultValue='Сортировка'
                  options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                  ]} />
      </div>
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title="Posts of JS"/>
        : <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
      }
    </div>
  );
}

export default App;
