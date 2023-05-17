import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import ErrorPage from '../pages/ErrorPage'
import PostPage from '../pages/PostPage'
import Login from '../pages/Login'
import { AuthContext } from '../context'
import MyLoader from './ui/loader/MyLoader'

type Props = {}

const AppRouter = (props: Props) => {

    const {isAuth, isLoading} = useContext(AuthContext);
    
    if(isLoading){
        return <MyLoader/>
    }
  return (
    isAuth 
        ?
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/posts/:id" element={<PostPage />}/>
            <Route path="*" element={<Navigate to='/posts' />}/>
        </Routes>
        :
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<Navigate to='/login' />}/>
        </Routes>
  )
}

export default AppRouter