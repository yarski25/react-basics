import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';
import PostService from '../../api/PostService';
import { IPostItem } from '../../types/interfaces/PostItem';
import MyLoader from '../../components/ui/loader/MyLoader';
import { IPostComments } from '../../types/interfaces/PostComments';

type PostPageParams = {
  id: string;
};

const PostPage = () => {
  const { id } = useParams<PostPageParams>();
  const [post, setPost] = useState<IPostItem>();
  const [comments, setComments] = useState<IPostComments[]>();

  const [fetchPostById, isLoading] = useFetching(async (id: number) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchCommmentsByPostId, isComLoading] = useFetching(async (id: number) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(Number(id));
    fetchCommmentsByPostId(Number(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1 data-testid='post-h1'>Вы открыли страницу поста с ID = {id}</h1>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div data-testid='post-div'>
          {post?.id} {post?.title}
        </div>
      )}
      <h1 data-testid='comments-h1'>Комментарии</h1>
      {isComLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments?.map((comment) => (
            <div
              key={comment.id}
              style={{ marginTop: '15px' }}
              data-testid='comment-div'
            >
              <h5>{comment.email}</h5>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
