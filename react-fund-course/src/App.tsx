import React, { useState } from 'react';
import './App.scss';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostList from './components/PostList';
import { IPostItem } from './interfaces/PostItem';

function App() {

  const[posts, setPosts] = useState<IPostItem[]>([
    {id: 1, title: 'JavaScript', body: 'JavaScript - язык програмирования'},
    {id: 2, title: 'TypeScript', body: 'TypeScript - язык програмирования'},
    {id: 3, title: 'NodeJS', body: 'NodeJS - язык програмирования'}
  ])

  const[posts2, setPosts2] = useState<IPostItem[]>([
    {id: 1, title: 'Python', body: 'Python - язык програмирования'},
    {id: 2, title: 'Python 2', body: 'Python 2 - язык програмирования'},
    {id: 3, title: 'Python 3', body: 'Python 3 - язык програмирования'}
  ])

  return (
    <div className="App">
      <PostList posts={posts} title="Posts of JS"/>
      <PostList posts={posts2} title="Posts of Python"/>
    </div>
  );
}

export default App;
