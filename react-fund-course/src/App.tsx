import React, { useEffect, useState } from 'react'
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import MyNavbar from './components/ui/navbar/MyNavbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';

type AppProps = {}

function App({}: AppProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect( () => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
    setIsLoading(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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