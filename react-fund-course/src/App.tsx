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
    {id: 1, title: 'JavaScript', body: 'BJavaScript - язык програмирования'},
    {id: 2, title: 'TypeScript', body: 'ATypeScript - язык програмирования'},
    {id: 3, title: 'NodeJS', body: 'KNodeJS - язык програмирования'}
  ])

  const [selectedSort, setSelectedSort] = useState('');
  const [searchedPost, setSearchedPost] = useState('');

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
    setPosts([...posts].sort((a: any , b: any) => a[sort].localeCompare(b[sort])));
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    const search = e.target.value;
    setSearchedPost(search);
  }

  if (searchedPost.length > 0){
    posts.filter((post) => {return post.title.match(searchedPost);});
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
      <input type='search'
             placeholder='search here'
             onChange={onChangeSearch}
             value={searchedPost} />
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title="Posts of JS"/>
        : <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
      }
    </div>
  );
}

export default App;
