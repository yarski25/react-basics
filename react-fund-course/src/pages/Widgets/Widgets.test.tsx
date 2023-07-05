import { render } from '@testing-library/react';
import Widgets from './Widgets';

describe('Widgets tests', () => {
  it('should render Widgets', () => {
    const { container } = render(<Widgets />);
    expect(container).toBeInTheDocument();
  });
});
