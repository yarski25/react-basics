import React from 'react'
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import MyNavbar from './components/ui/navbar/MyNavbar';
import AppRouter from './components/AppRouter';

type Props = {}

function App({}: Props) {
  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App