import React, { useState } from 'react';
import './App.scss';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostItem from './components/PostItem';

function App() {

  const [value, setValue] = useState('TEXT IN INPUT')

  return (
    <div className="App">
      <PostItem post={{id: 1, title: 'JavaScript', body: 'JavaScript - язык програмирования'}} />
      <PostItem post={{id: 2, title: 'TypeScript', body: 'TypeScript - язык програмирования'}} />
      <PostItem post={{id: 3, title: 'NodeJS', body: 'NodeJS - язык програмирования'}} />
    </div>
  );
}

export default App;
