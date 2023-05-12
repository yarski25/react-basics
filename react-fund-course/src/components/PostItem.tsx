type Props = {
    post: {
        id: number;
        title: string;
        body: string;
    };
    number: number;
};

const PostItem = ({post, number}: Props) => {
  return (
    <div>
        <div className="post">
            <div className="post-content">
                <strong>{number}. {post.title}</strong>
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