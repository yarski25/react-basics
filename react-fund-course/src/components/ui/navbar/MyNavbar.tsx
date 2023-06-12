import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
import { useLogoutMutation } from '../../../api/AuthService';
import { setCredentials } from '../../../store/reducers/AuthSlice';
import { AuthResponse } from '../../../types/interfaces/response/AuthResponse';
import { useDispatch } from 'react-redux';

const MyNavbar = () => {
  const { setIsAuth } = useContext(AuthContext);

  const dispatch = useDispatch();

  const [logoutUser] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser({})
        .unwrap()
        .then((response) => {
          if (response) localStorage.removeItem('token');
          setIsAuth(false);
          localStorage.removeItem('auth');
          dispatch(setCredentials({} as AuthResponse));
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className='navbar'>
      <MyButton onClick={handleSignup}>Sign Up</MyButton>
      <MyButton onClick={handleLogout}>Logout</MyButton>
      <div className='navbar__links'>
        <Link
          to='/about'
          data-testid='about-link'
        >
          About
        </Link>
        <Link
          to='/posts'
          data-testid='posts-link'
        >
          Posts
        </Link>
      </div>
    </div>
  );
};

export default MyNavbar;
