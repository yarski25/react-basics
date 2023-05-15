import React, { useEffect, useState } from 'react';
import './App.scss';
import PostList from './components/PostList';
import { IPostItem } from './interfaces/PostItem';
import MyButton from './components/ui/button/MyButton';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/ui/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import PostService from './api/PostService';
import MyLoader from './components/ui/loader/MyLoader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';
import MyPagination from './components/ui/pagination/MyPagination';

function App() {

  const[posts, setPosts] = useState<IPostItem[]>([
    // {id: 1, title: 'JavaScript', body: 'BJavaScript - язык програмирования'},
    // {id: 2, title: 'TypeScript', body: 'ATypeScript - язык програмирования'},
    // {id: 3, title: 'NodeJS', body: 'KNodeJS - язык програмирования'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);


  // hooks

  const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit : number, page : number) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect( () => {
    fetchPosts(limit, page);
  }, []);

  // methods
  const createPost = (newPost : IPostItem) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post : IPostItem) =>{
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page: number) => {
    setPage(page);
    fetchPosts(limit, page);
  }

  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>GET POSTS</button> */}
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
      {postError &&
        <h1>Error occured ${postError}</h1> }
      {isPostsLoading
        ? <div style={{display: 'flex', 
                       justifyContent: 'center',
                       marginTop: '50px'}}>
                       <MyLoader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts of JS"/>
      }
      <MyPagination page={page} 
                    changePage={changePage} 
                    totalPages={totalPages}/>
    </div>
  );
}

export default App;
