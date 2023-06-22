import React, { useState } from 'react';
import MyInput from '../../components/ui/input/MyInput';
import MyButton from '../../components/ui/button/MyButton';
//import { AuthContext } from '../../context';
//import { useRegistrationMutation } from '../../api/AuthService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { registration } from '../../store/reducers/ActionCreators';

type SignUpProps = {
  onSubmit?: (form: ISignUpForm) => void;
};

interface ISignUpForm {
  username: string;
  password: string;
  passwordConfirm: string;
}

const SignUpPage = ({ onSubmit }: SignUpProps) => {
  //const { setIsAuth } = useContext(AuthContext);
  const [form, setForm] = useState<ISignUpForm>({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  // 👇 Auth API Mutation
  //const [registrationUser] = useRegistrationMutation();

  const handleRegistration = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (form.password === form.passwordConfirm) {
        dispatch(registration({ email: form.username, password: form.password }));
        onSubmit?.(form);
      }
      // await registrationUser({ email: form.username, password: form.password })
      //   .unwrap()
      //   .then((response) => {
      //     if (response.accessToken) localStorage.setItem('token', response.accessToken);
      //     setIsAuth(true);
      //     dispatch(setCredentials(response));
      //     onSubmit?.(form);
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
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

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, passwordConfirm: e.target.value });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    //const paste = e.clipboardData.getData('text/plain');
    e.preventDefault();
    return false;
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
        <MyInput
          data-testid='confirm-password-input'
          type='password'
          placeholder='Confirm password'
          value={form.passwordConfirm}
          onChange={handleConfirmPassword}
          onPaste={handlePaste}
        />
        <MyButton data-testid='signnup-button'>Sign Up</MyButton>
      </form>
    </div>
  );
};

export default SignUpPage;
