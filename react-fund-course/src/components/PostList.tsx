import { IPostItem } from '../interfaces/PostItem';
import PostItem from './PostItem';

type Props = {
     posts: IPostItem[],
     title: string,
     number?: number
}

const PostList = ({posts, title, number}: Props) => {
  return (
    <div>
        <h1 style={{textAlign: 'center'}}> 
        {title}
        </h1>
        {posts.map((post, index) => <PostItem number={index+1} post={post} key={post.id}/>)}
    </div>
  )
}

export default PostList