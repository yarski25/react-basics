import React, { useState } from 'react';
import './App.scss';
import PostList from './components/PostList';
import { IPostItem } from './interfaces/PostItem';
import MyButton from './components/ui/button/MyButton';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/ui/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';

function App() {

  const[posts, setPosts] = useState<IPostItem[]>([
    // {id: 1, title: 'JavaScript', body: 'BJavaScript - язык програмирования'},
    // {id: 2, title: 'TypeScript', body: 'ATypeScript - язык програмирования'},
    // {id: 3, title: 'NodeJS', body: 'KNodeJS - язык програмирования'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  // methods
  const createPost = (newPost : IPostItem) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data);  
  }


  const removePost = (post : IPostItem) =>{
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
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
