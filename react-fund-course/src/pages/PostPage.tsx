import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../api/PostService';
import { IPostItem } from '../interfaces/PostItem';
import MyLoader from '../components/ui/loader/MyLoader';
import { IPostComments } from '../interfaces/PostComments';

type Props = {}

const PostPage = (props: Props) => {
    const params = useParams();
    const [post, setPost] = useState<IPostItem>();
    const [comments, setComments] = useState<IPostComments[]>();

    const [fetchPostById, isLoading, error] = useFetching( async (id: number) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })

    const [fetchCommmentsByPostId, isComLoading, comError] = useFetching( async (id: number) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })


    useEffect(() => {
        fetchPostById(Number(params.id));
        fetchCommmentsByPostId(Number(params.id));
    }, [])
  return (
    <div>
        <h1>Вы открыли страницу поста с ID = {params.id}</h1>
        {isLoading
            ? <MyLoader />
            : <div>{post?.id} {post?.title}</div>
        }
        <h1>Комментарии</h1>
        {isComLoading
            ? <MyLoader />
            : <div>
                {comments?.map(comment => 
                    <div key={comment.id} style={{marginTop: '15px'}}>
                        <h5>{comment.email}</h5>
                        <div>{comment.body}</div>
                    </div> 
                )}
            </div>
        }
    </div>
  )
}

export default PostPage