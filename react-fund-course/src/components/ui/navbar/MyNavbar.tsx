import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const MyNavbar = () => {
  const { setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };

  return (
    <div className='navbar'>
      <MyButton onClick={logout}>Logout</MyButton>
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
