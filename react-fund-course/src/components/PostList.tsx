import { IPostItem } from '../interfaces/PostItem';
import PostItem from './PostItem';

type Props = {
     posts: IPostItem[];
}

const PostList = ({posts}: Props) => {
  return (
    <div>
        <h1 style={{textAlign: 'center'}}> 
        List of posts
        </h1>
        {posts.map(post => <PostItem post={post} key={post.id}/>)}
    </div>
  )
}

export default PostList