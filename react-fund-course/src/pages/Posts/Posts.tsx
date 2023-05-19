import { useEffect, useRef, useState } from 'react';
import '../App.scss';
import { IPostItem } from '../../types/interfaces/PostItem';
import { usePosts } from '../../hooks/usePosts';
import { useFetching } from '../../hooks/useFetching';
import PostService from '../../api/PostService';
import { getPageCount } from '../../utils/pages';
import MyButton from '../../components/ui/button/MyButton';
import MyModal from '../../components/ui/modal/MyModal';
import PostForm from '../../components/PostForm';
import PostFilter from '../../components/PostFilter';
import MyLoader from '../../components/ui/loader/MyLoader';
import PostList from '../../components/PostList';
import MyPagination from '../../components/ui/pagination/MyPagination';
import { IFilter } from '../../types/interfaces/Filter';

function Posts() {
  const [posts, setPosts] = useState<IPostItem[]>([
    // {id: 1, title: 'JavaScript', body: 'BJavaScript - язык програмирования'},
    // {id: 2, title: 'TypeScript', body: 'ATypeScript - язык програмирования'},
    // {id: 3, title: 'NodeJS', body: 'KNodeJS - язык програмирования'}
  ]);

  //let filterState: IFilter = {sort: '', query: ''};

  const [filter, setFilter] = useState<IFilter>({ sort: '', query: '' });
  const [modal, setModal] = useState<boolean>(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const lastElement = useRef<HTMLDivElement | null>(null);

  // hooks

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit: number, page: number) => {
      const response = await PostService.getAll(limit, page);
      //setPosts([...posts, ...response.data]);
      setPosts(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    },
  );

  //   useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  //     setPage(page + 1);
  //   })

  useEffect(() => {
    fetchPosts(limit, page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // methods
  const createPost = (newPost: IPostItem) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post: IPostItem) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page: number) => {
    setPage(page);
    fetchPosts(limit, page);
    window.scrollTo(0, 0);
  };

  //   const selectLimit = (e: React.ChangeEvent<HTMLSelectElement>) =>{
  //     //e.preventDefault();
  //     const newLimit = Number(e.target.value);
  //     setLimit(newLimit);
  //     //console.log(limit);
  // }

  return (
    <div className='App'>
      {/* <button onClick={fetchPosts}>GET POSTS</button> */}
      <MyButton
        style={{ marginTop: 30 }}
        onClick={() => setModal(true)}
      >
        Создать пользователя
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '1em 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {/* <MySelect value={limit.toString()}
                onChange= {selectLimit}
                defaultValue='Number of elements on page'
                options={[
                    {value: '5', name:'5'},
                    {value: '10', name: '10'},
                    {value: '25', name: '25'},
                    {value: '-1', name: 'all'},
                ]}/> */}
      {postError && <h1>Error occured ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title='Posts of JS'
      />
      <div
        ref={lastElement}
        style={{ height: 20, background: 'red' }}
      ></div>
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <MyLoader />
        </div>
      )}
      <MyPagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
