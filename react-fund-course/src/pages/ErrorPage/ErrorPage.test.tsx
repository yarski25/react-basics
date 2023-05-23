import ErrorPage from './ErrorPage';
import { render } from '@testing-library/react';

describe('ErrorPage tests', () => {
  it('should render ErrorPage', () => {
    const { container } = render(<ErrorPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render h1', () => {
    const { getByRole } = render(<ErrorPage />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it('should render h1 with defined text context', () => {
    const { getByRole } = render(<ErrorPage />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Page not exists!');
  });

  it('should render h1 styled with red text color', () => {
    const { getByRole } = render(<ErrorPage />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveStyle('color: red');
  });
});
