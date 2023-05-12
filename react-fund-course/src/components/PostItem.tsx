type Props = {
    post: {
        id: number;
        title: string;
        body: string;
    };
};

const PostItem = ({post}: Props) => {
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
                <button>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default PostItem