import React, { useEffect, useState } from 'react'
import './App.scss';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import MyNavbar from './components/ui/navbar/MyNavbar';
import AppRouter from './components/AppRouter';
import { routesConfig } from './router';
import { AuthContext } from './context';

type Props = {}

function App({}: Props) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{isAuth,
                                  setIsAuth,
                                  isLoading}}>
      <BrowserRouter>
        <MyNavbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App