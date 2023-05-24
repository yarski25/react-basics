import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import MyButton from '../../components/ui/button/MyButton';
import userEvent from '@testing-library/user-event';

describe('Login tests', () => {
  it('should render Login', () => {
    const { container } = render(<Login />);
    expect(container).toBeInTheDocument();
  });

  it('should render h1', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render h1 with defined text context', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Login page',
    );
  });

  it('should render form', () => {
    render(<Login />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('should render MyInput login', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
  });

  it('should render MyInput password', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
  });

  it('should render MyButton login', () => {
    render(<Login />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should test username input has expected atributes', () => {
    render(<Login />);
    const input = screen.getByTestId('username-input');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Enter username');
    expect(input).toHaveAttribute('value', '');
    expect(input).not.toHaveAttribute('disabled');
  });

  it('should test username input functionality', () => {
    render(<Login />);
    const input = screen.getByTestId('username-input');
    const username = 'username';

    expect(input).toHaveValue('');
    fireEvent.input(input, { target: { value: username } });
    expect(input).toHaveValue(username);
    fireEvent.input(input, { target: { value: '' } });
    expect(input).toHaveValue('');
  });

  it('should test password input has expected atributes', () => {
    render(<Login />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveAttribute('value', '');
    expect(input).not.toHaveAttribute('disabled');
  });

  it('should test password input functionality', () => {
    render(<Login />);
    const input = screen.getByTestId('password-input');
    const pwd = 'password';

    expect(input).toHaveValue('');
    fireEvent.input(input, { target: { value: pwd } });
    expect(input).toHaveValue(pwd);
    fireEvent.input(input, { target: { value: '' } });
    expect(input).toHaveValue('');
  });

  it('should test click on login button', () => {
    const onClick = jest.fn();
    render(<MyButton onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should test form has attributes', () => {
    render(<Login />);
    const form = screen.getByTestId('login-form');
    expect(form).toHaveAttribute('action', '');
    expect(form).not.toHaveAttribute('disabled');
  });

  it('should test form functionality', async () => {
    const onSubmit = jest.fn();
    render(<Login onSubmit={onSubmit} />);

    expect(onSubmit).not.toHaveBeenCalledWith({
      username: '',
      password: '',
    });

    fireEvent.click(screen.getByTestId('login-button'));

    expect(onSubmit).toHaveBeenCalledWith({
      username: '',
      password: '',
    });

    const username = 'james';
    const pwd = 'bond';

    await userEvent.type(screen.getByTestId('username-input'), username);
    await userEvent.type(screen.getByTestId('password-input'), pwd);

    fireEvent.click(screen.getByTestId('login-button'));

    expect(onSubmit).toHaveBeenCalledWith({
      username: username,
      password: pwd,
    });
  });
});
