import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Posts from '../pages/Posts/Posts';
import PostPage from '../pages/PostPage/PostPage';
import Login from '../pages/Login/Login';
import { AuthContext } from '../context';
import MyLoader from './ui/loader/MyLoader';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <MyLoader />;
  }
  return isAuth ? (
    <Routes>
      <Route
        path='/signup'
        element={<SignUpPage />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/about'
        element={<About />}
      />
      <Route
        path='/posts'
        element={<Posts />}
      />
      <Route
        path='/posts/:id'
        element={<PostPage />}
      />
      <Route
        path='*'
        element={<Navigate to='/posts' />}
      />
    </Routes>
  ) : (
    <Routes>
      <Route
        path='/signup'
        element={<SignUpPage />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='*'
        element={<Navigate to='/login' />}
      />
    </Routes>
  );
};

export default AppRouter;
