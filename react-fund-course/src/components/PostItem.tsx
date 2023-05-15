import { IPostItem } from "../interfaces/PostItem";
import MyButton from "./ui/button/MyButton";

type Props = {
    post: {
        id: number;
        title: string;
        body: string;
    };
    number: number;
    remove: (post: IPostItem)=>void;
};

const PostItem = ({post, number, remove}: Props) => {
  return (
    <div>
        <div className="post">
            <div className="post-content">
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post-btns">
                <MyButton onClick={()=>remove(post)}>
                    Delete
                </MyButton>
            </div>
        </div>
    </div>
  )
}

export default PostItem