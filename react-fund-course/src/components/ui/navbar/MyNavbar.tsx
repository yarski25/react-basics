//import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../button/MyButton';
//import { AuthContext } from '../../../context';
//import { useLogoutMutation } from '../../../api/AuthService';
//import { AuthResponse } from '../../../types/interfaces/response/AuthResponse';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { logout } from '../../../store/reducers/ActionCreators';
import { selectAuth } from '../../../store/reducers/AuthSlice';
import { useSelector } from 'react-redux';
import { PropsWithChildren } from 'react';

const MyNavbar = () => {
  //const { setIsAuth } = useContext(AuthContext);

  const dispatch = useDispatch<AppDispatch>();

  //const [logoutUser] = useLogoutMutation();

  const isAuth = useSelector(selectAuth);

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

  const handleLogin = () => {
    navigate('/login');
  };

  type MyLinkProps = {
    to: string;
  };

  function MyLink(props: PropsWithChildren<MyLinkProps>) {
    const location = useLocation();
    const match = location.pathname === props.to;

    return (
      <div className={match ? 'active' : ''}>
        <Link to={props.to}>{props.children}</Link>
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className='navbar__links'>
        <MyLink
          to='/about'
          data-testid='about-link'
        >
          About
        </MyLink>
        <MyLink
          to='/posts'
          data-testid='posts-link'
        >
          Posts
        </MyLink>
        <MyLink
          to='/widgets'
          data-testid='widgets-link'
        >
          Widgets
        </MyLink>

        {/* <Link
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
        </Link> */}
      </div>
      <div className='navbar__auth'>
        <MyButton
          onClick={handleSignup}
          style={{
            backgroundColor: 'rgba(0, 128, 128, 1.0)',
            color: 'white',
            borderRadius: '0.8em',
          }}
        >
          Sign Up
        </MyButton>
        {isAuth ? (
          <MyButton
            onClick={handleLogout}
            style={{ borderRadius: '0.8em' }}
          >
            Logout
          </MyButton>
        ) : (
          <MyButton
            onClick={handleLogin}
            style={{
              backgroundColor: 'rgba(0, 128, 128, 0.5)',
              color: 'white',
              borderRadius: '0.8em',
            }}
          >
            Login
          </MyButton>
        )}
      </div>
    </div>
  );
};

export default MyNavbar;
