import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../api/PostService';
import { IPostItem } from '../interfaces/PostItem';
import MyLoader from '../components/ui/loader/MyLoader';

type Props = {}

const PostPage = (props: Props) => {
    const params = useParams();
    const [post, setPost] = useState<IPostItem>();

    const [fetchPostById, isLoading, error] = useFetching( async (id: number) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    useEffect(() => {
        fetchPostById(Number(params.id))
    }, [])
  return (
    <div>
        <h1>Вы открыли страницу поста с ID = {params.id}</h1>
        {isLoading
            ? <MyLoader />
            : <div>{post?.id} {post?.title}</div>
        }
    </div>
  )
}

export default PostPage