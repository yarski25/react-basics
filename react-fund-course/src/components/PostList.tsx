import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IPostItem } from '../types/interfaces/PostItem';
import PostItem from './PostItem';

type PostListProps = {
     posts: IPostItem[],
     title: string,
     number?: number,
     remove: (post: IPostItem) => void
}

const PostList = ({posts, title, remove}: PostListProps) => {
  
  if(!posts.length){
    return(<h1 style={{textAlign: 'center'}}>
        Посты не найдены!</h1>)
  }

  return (
    <div>
        <h1 style={{textAlign: 'center'}}> 
        {title}
        </h1>
        <TransitionGroup>
          {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem remove={remove} number={index+1} post={post}/>
          </CSSTransition>
        )}
        </TransitionGroup>
    </div>
  )
}

export default PostList