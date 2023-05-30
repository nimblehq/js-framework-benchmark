import { render, screen } from '@testing-library/react';

import AppLayout from './';

describe('AppLayout', () => {
  it('renders the component', () => {
    render(
      <AppLayout>
        <></>
      </AppLayout>
    );

    expect(screen.getByTestId('layout-default')).toBeVisible();
  });
});
