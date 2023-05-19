import { render } from '@testing-library/react';
import About from './About';

describe('About tests', () => {
  it('should render About', () => {
    const { container } = render(<About />);
    expect(container).toBeInTheDocument();
  });

  it('should render h1', () => {
    const { getByRole } = render(<About />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it('should render h1 with defined text context', () => {
    const { getByRole } = render(<About />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('This app is created for learning purposes');
  });
});
