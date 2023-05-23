import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login tests', () => {
  it('should render Login', () => {
    const { container } = render(<Login />);
    expect(container).toBeInTheDocument();
  });

  it('should render h1', () => {
    render(<Login />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it('should render h1 with defined text context', () => {
    render(<Login />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Login page');
  });

  it('should render form with name', () => {
    render(<Login />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should render MyInput login', () => {
    render(<Login />);
    const input = screen.getByPlaceholderText(/Enter login/i);
    expect(input).toBeInTheDocument();
  });

  it('should render MyInput password', () => {
    render(<Login />);
    const input = screen.getByPlaceholderText(/Enter password/i);
    expect(input).toBeInTheDocument();
  });

  it('should render MyButton login', () => {
    render(<Login />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
