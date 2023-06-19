//import { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import MyNavbar from './components/ui/navbar/MyNavbar';
import AppRouter from './components/AppRouter';
//import { AuthContext } from './context';
import UsersList from './components/UsersList';

function App() {
  //const [isAuth, setIsAuth] = useState<boolean>(false);
  //const [isLoading, setIsLoading] = useState<boolean>(true);

  // const dispatch = useAppDispatch();
  // const { users, isUsersLoading, error } = useAppSelector(
  //   (state) => state.userReducer,
  // );

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setIsAuth(true);
  //   }
  //   setIsLoading(false);
  // }, []);

  return (
    // <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
    <BrowserRouter>
      <MyNavbar />
      {/* {isUsersLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {JSON.stringify(users, null, 2)} */}
      <UsersList />
      <AppRouter />
    </BrowserRouter>
    // </AuthContext.Provider>
  );
}

export default App;
