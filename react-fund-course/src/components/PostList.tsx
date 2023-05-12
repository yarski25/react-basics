import { IPostItem } from '../interfaces/PostItem';
import PostItem from './PostItem';

type Props = {
     posts: IPostItem[],
     title: string
}

const PostList = ({posts, title}: Props) => {
  return (
    <div>
        <h1 style={{textAlign: 'center'}}> 
        {title}
        </h1>
        {posts.map(post => <PostItem post={post} key={post.id}/>)}
    </div>
  )
}

export default PostList