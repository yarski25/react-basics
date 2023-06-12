import React, { useContext, useState } from 'react';
import MyInput from '../../components/ui/input/MyInput';
import MyButton from '../../components/ui/button/MyButton';
import { AuthContext } from '../../context';
import { useRegistrationMutation } from '../../api/AuthService';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/reducers/AuthSlice';

type SignUpProps = {
  onSubmit?: (form: ILogin) => void;
};

interface ILogin {
  username: string;
  password: string;
}

const SignUpPage = ({ onSubmit }: SignUpProps) => {
  const { setIsAuth } = useContext(AuthContext);
  const [form, setForm] = useState<ILogin>({ username: '', password: '' });

  const dispatch = useDispatch();

  // 👇 Auth API Mutation
  const [registrationUser] = useRegistrationMutation();

  const handleRegistration = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await registrationUser({ email: form.username, password: form.password })
        .unwrap()
        .then((response) => {
          if (response.accessToken) localStorage.setItem('token', response.accessToken);
          setIsAuth(true);
          dispatch(setCredentials(response));
          onSubmit?.(form);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: e.target.value });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  return (
    <div>
      <h1>Sign Up page</h1>
      <form
        data-testid='signnup-form'
        action=''
        onSubmit={handleRegistration}
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
        <MyButton data-testid='signnup-button'>Sign Up</MyButton>
      </form>
    </div>
  );
};

export default SignUpPage;
