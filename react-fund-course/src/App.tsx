import React from 'react'
import './App.scss';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import MyNavbar from './components/ui/navbar/MyNavbar';
import ErrorPage from './pages/ErrorPage';

type Props = {}

function App({}: Props) {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/about" element={<About />}/>
        <Route path="/posts" element={<Posts />}/>
        <Route path="/error" element={<ErrorPage />}/>
        <Route path="*" element={<Navigate to='/error' />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App