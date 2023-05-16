import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import ErrorPage from '../pages/ErrorPage'
import PostPage from '../pages/PostPage'

type Props = {}

const AppRouter = (props: Props) => {
  return (
    <Routes>
        <Route path="/about" element={<About />}/>
        <Route path="/posts" element={<Posts />}/>
        <Route path="/posts/:id" element={<PostPage />}/>
        <Route path="/error" element={<ErrorPage />}/>
        <Route path="*" element={<Navigate to='/error' />}/>
    </Routes>
  )
}

export default AppRouter