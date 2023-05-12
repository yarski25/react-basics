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

  return (
    <div className="App">
      <PostList posts={posts}/>
    </div>
  );
}

export default App;
