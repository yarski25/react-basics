import { useNavigate } from "react-router-dom";
import { IPostItem } from "../interfaces/PostItem";
import MyButton from "./ui/button/MyButton";

type PostItemProps = {
    post: IPostItem;
    number: number;
    remove: (post: IPostItem)=>void;
};

const PostItem = ({post, number, remove}: PostItemProps) => {
    const router = useNavigate();

  return (
    <div>
        <div className="post">
            <div className="post-content">
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={()=>router(`/posts/${post.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={()=>remove(post)}>
                    Delete
                </MyButton>
            </div>
        </div>
    </div>
  )
}

export default PostItem