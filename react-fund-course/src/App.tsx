import React, { useMemo, useRef, useState } from 'react';
import './App.scss';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostList from './components/PostList';
import { IPostItem } from './interfaces/PostItem';
import MyButton from './components/ui/button/MyButton';
import MyInput from './components/ui/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/ui/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/ui/modal/MyModal';

function App() {

  const[posts, setPosts] = useState<IPostItem[]>([
    {id: 1, title: 'JavaScript', body: 'BJavaScript - язык програмирования'},
    {id: 2, title: 'TypeScript', body: 'ATypeScript - язык програмирования'},
    {id: 3, title: 'NodeJS', body: 'KNodeJS - язык програмирования'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);

  const sortedPosts = useMemo( () => {
    console.log('getSortedPosts() called');
    if(filter.sort){
      return [...posts].sort((a: any , b: any) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo( () => {
    console.log('sortedAndSearchedPosts called');
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
  }, [filter.query, sortedPosts]);

  // methods
  const createPost = (newPost : IPostItem) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post : IPostItem) =>{
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} 
                onClick={()=> setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal}
               setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{margin: '1em 0'}} />
      <PostFilter filter={filter} 
                  setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts of JS"/>
    </div>
  );
}

export default App;
