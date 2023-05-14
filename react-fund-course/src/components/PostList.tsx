import { IPostItem } from '../interfaces/PostItem';
import PostItem from './PostItem';

type Props = {
     posts: IPostItem[],
     title: string,
     number?: number,
     remove: (post: IPostItem) => void
}

const PostList = ({posts, title, number, remove}: Props) => {
  
  if(!posts.length){
    return(<h1 style={{textAlign: 'center'}}>
        Посты не найдены!</h1>)
  }

  return (
    <div>
        <h1 style={{textAlign: 'center'}}> 
        {title}
        </h1>
        {posts.map((post, index) => <PostItem remove={remove} number={index+1} post={post} key={post.id}/>)}
    </div>
  )
}

export default PostList