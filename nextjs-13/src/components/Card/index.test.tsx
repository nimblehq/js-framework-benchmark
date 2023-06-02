import { render, screen } from '@testing-library/react';

import Card from './index';

describe('Card', () => {
  it('renders card', () => {
    render(
      <Card>
        <></>
      </Card>
    );
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
