//import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../button/MyButton';
//import { AuthContext } from '../../../context';
//import { useLogoutMutation } from '../../../api/AuthService';
//import { AuthResponse } from '../../../types/interfaces/response/AuthResponse';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { logout } from '../../../store/reducers/ActionCreators';

const MyNavbar = () => {
  //const { setIsAuth } = useContext(AuthContext);

  const dispatch = useDispatch<AppDispatch>();

  //const [logoutUser] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logout());
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
