import React, { useState } from 'react';
import './App.scss';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostList from './components/PostList';
import { IPostItem } from './interfaces/PostItem';
import MyButton from './components/ui/button/MyButton';
import MyInput from './components/ui/input/MyInput';

function App() {

  const[posts, setPosts] = useState<IPostItem[]>([
    {id: 1, title: 'JavaScript', body: 'JavaScript - язык програмирования'},
    {id: 2, title: 'TypeScript', body: 'TypeScript - язык програмирования'},
    {id: 3, title: 'NodeJS', body: 'NodeJS - язык програмирования'}
  ])

  return (
    <div className="App">
      <form>
        <MyInput type="text" placeholder='Название поста'/>
        <MyInput type="text" placeholder='Описание поста'/>
        <MyButton disabled={true}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Posts of JS"/>
    </div>
  );
}

export default App;
