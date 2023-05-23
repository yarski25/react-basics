import { render } from '@testing-library/react';
import Login from './Login';

describe('Login tests', () => {
  it('should render Login', () => {
    const { container } = render(<Login />);
    expect(container).toBeInTheDocument();
  });

  it('should render h1', () => {
    const { getByRole } = render(<Login />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it('should render h1 with defined text context', () => {
    const { getByRole } = render(<Login />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Login page');
  });
});
