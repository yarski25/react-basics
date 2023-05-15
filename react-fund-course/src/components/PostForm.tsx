import React, { useState } from 'react'
import MyInput from './ui/input/MyInput'
import MyButton from './ui/button/MyButton'
import { IPostItem } from '../interfaces/PostItem';

type Props = {
    create: (post: IPostItem)=>void
}

const PostForm = ({create}: Props) => {

    const[post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''})
      }

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPost({...post, title: e.target.value});
    }

    const onChangeBody = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPost({...post, body: e.target.value});
    }

  return (
    <form>
        <MyInput value={post.title}
                 onChange={onChangeTitle}
                 type="text" 
                 placeholder='Название поста'/>
        <MyInput value={post.body}
                 onChange={onChangeBody}
                 type="text"
                 placeholder='Описание поста'/>
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  )
}

export default PostForm