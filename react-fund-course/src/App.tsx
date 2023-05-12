import React, { useRef, useState } from 'react';
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

  const[title, setTitle] = useState('');

  const bodyInputRef = useRef<HTMLInputElement>(null);

  // methods 
  const addNewPost = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    console.log(title);
    console.log(bodyInputRef.current?.value)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setTitle(e.target.value);
  }

  return (
    <div className="App">
      <form>
        <MyInput value={title}
                 //onChange={ (e : React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                 onChange={onChange}
                 type="text" 
                 placeholder='Название поста'/>
        <MyInput ref={bodyInputRef}
                 type="text"
                 placeholder='Описание поста'/>
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Posts of JS"/>
    </div>
  );
}

export default App;
