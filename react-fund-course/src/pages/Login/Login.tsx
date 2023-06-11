import React, { useContext, useState } from 'react';
import MyInput from '../../components/ui/input/MyInput';
import MyButton from '../../components/ui/button/MyButton';
import { AuthContext } from '../../context';
import { useLoginMutation } from '../../api/AuthService';

type LoginProps = {
  onSubmit?: (form: ILogin) => void;
};

interface ILogin {
  username: string;
  password: string;
}

const Login = ({ onSubmit }: LoginProps) => {
  const { setIsAuth } = useContext(AuthContext);
  const [form, setForm] = useState<ILogin>({ username: '', password: '' });

  // 👇 API Login Mutation
  const [loginUser] = useLoginMutation();

  const login = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // password rules
    // Must contain at least one digit (0-9).
    // Must contain at least one letter (a-z or A-Z).
    // Must contain at least one special character (!@#$%^&*).
    // Must be between 8 and 20 characters long.
    // Only allowed characters are letters (a-z or A-Z), digits (0-9), and special characters (!@#$%^&*).

    // const passwordPattern = /^(?=.*[a-zA-Z])$/;
    // //const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    // if (!passwordPattern.test(form.password)) {
    //   //console.log("Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.");
    //   console.log('Password requirements: 1 letter.');
    //   return;
    // }
    // alert(
    //   'The username and password are ' +
    //     form.username +
    //     ' and ' +
    //     form.password +
    //     ' respectively.',
    // );

    // if (
    //   form.username === process.env.REACT_APP_USERNAME &&
    //   form.password === process.env.REACT_APP_PWD
    // ) {
    //   setIsAuth(true);
    //   localStorage.setItem('auth', 'true');
    //   console.log('login success');
    // } else {
    //   console.log('login failed');
    // }

    loginUser({ email: form.username, password: form.password });
    setIsAuth(true);
    onSubmit?.(form);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: e.target.value });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  return (
    <div>
      <h1>Login page</h1>
      <form
        data-testid='login-form'
        action=''
        onSubmit={login}
      >
        <MyInput
          data-testid='username-input'
          type='text'
          placeholder='Enter username'
          value={form.username}
          onChange={handleUsername}
        />
        <MyInput
          data-testid='password-input'
          type='password'
          placeholder='Enter password'
          value={form.password}
          onChange={handlePassword}
        />
        <MyButton data-testid='login-button'>Login</MyButton>
      </form>
    </div>
  );
};

export default Login;
