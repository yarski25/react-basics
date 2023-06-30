//import { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import MyNavbar from './components/ui/navbar/MyNavbar';
import AppRouter from './components/AppRouter';
//import { AuthContext } from './context';
//import UsersList from './components/UsersList';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { checkAuth } from './store/reducers/ActionCreators';
import { useEffect } from 'react';
//import { useSelector } from 'react-redux';
//import { selectAuth, selectLoading, selectUser } from './store/reducers/AuthSlice';
//import MyLoader from './components/ui/loader/MyLoader';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //const [isAuth, setIsAuth] = useState<boolean>(false);
  //const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  // const { users, isUsersLoading, error } = useAppSelector(
  //   (state) => state.userReducer,
  // );

  //const isAuth = useSelector(selectAuth);
  //const isLoading = useSelector(selectLoading);
  //const user = useSelector(selectUser);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setIsAuth(true);
  //   }
  //   setIsLoading(false);
  // }, []);

  //const notify = () => toast('Wow so easy!');

  return (
    // <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
    <BrowserRouter>
      {/* {isLoading ? (
        <MyLoader />
      ) : (
        <h1>{isAuth ? `User is authorized ${user}` : `Authorize please...`}</h1>
      )} */}
      {/* <button onClick={notify}>Notify</button>
      <ToastContainer /> */}
      <MyNavbar />
      {/* {isUsersLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {JSON.stringify(users, null, 2)} */}
      {/* <UsersList /> */}
      <AppRouter />
    </BrowserRouter>
    // </AuthContext.Provider>
  );
}

export default App;
