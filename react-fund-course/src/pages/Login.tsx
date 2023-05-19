import React, { useContext } from 'react';
import MyInput from '../components/ui/input/MyInput';
import MyButton from '../components/ui/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  const login = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <div>
      <h1>Login page</h1>
      <form
        action=''
        onSubmit={login}
      >
        <MyInput
          type='text'
          placeholder='Enter login'
        />
        <MyInput
          type='password'
          placeholder='Enter password'
        />
        <MyButton>Login</MyButton>
      </form>
    </div>
  );
};

export default Login;
