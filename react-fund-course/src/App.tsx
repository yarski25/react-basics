import React, { useRef, useState } from 'react';
import './App.scss';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostList from './components/PostList';
import { IPostItem } from './interfaces/PostItem';
import MyButton from './components/ui/button/MyButton';
import MyInput from './components/ui/input/MyInput';
import PostForm from './components/PostForm';

function App() {

  const[posts, setPosts] = useState<IPostItem[]>([
    {id: 1, title: 'JavaScript', body: 'JavaScript - язык програмирования'},
    {id: 2, title: 'TypeScript', body: 'TypeScript - язык програмирования'},
    {id: 3, title: 'NodeJS', body: 'NodeJS - язык програмирования'}
  ])

  // methods
  const createPost = (newPost : IPostItem) =>{
    setPosts([...posts, newPost])
  }


  return (
    <div className="App">
      <PostForm create={createPost} />
      <PostList posts={posts} title="Posts of JS"/>
    </div>
  );
}

export default App;
