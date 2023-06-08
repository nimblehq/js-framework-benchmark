import React from 'react';
import { MultiSelect } from 'react-multi-select-component';

import { render, waitFor, screen } from '@testing-library/react';

import MultiSelectWrapper from './index';

// jest.mock('MultiSelect', () => {
//   return jest.fn(() => null);
// });
jest.mock('react-multi-select-component');

describe('MultiSelectWrapper', () => {
  it('renders the component', async () => {
    const promise = {
      read() {
        return [];
      },
    };

    render(
      <MultiSelectWrapper
        promise={promise}
        selected={[]}
        setSelected={() => undefined}
      />
    );

    expect(screen.getByTestId('multi-select-wrapper')).toBeVisible();
  });

  it('MultiSelect receives correct props', async () => {
    const records = [
      { id: 1, name: 'Newsletter 1' },
      { id: 2, name: 'Newsletter 2' },
    ];

    const promise = {
      read() {
        return records;
      },
    };

    const selected = [records[0]];
    const setSelected = () => undefined;

    MultiSelect.mockImplementation(() => undefined);

    render(
      <MultiSelectWrapper
        promise={promise}
        selected={selected}
        setSelected={setSelected}
      />
    );

    const options = records.map((r) => {
      return {
        label: r.name,
        value: r.id,
      };
    });

    const opts = {
      className: 'react-multi-select',
      labelledBy: 'Select',
      onChange: setSelected,
      options: options,
      value: selected,
      ClearSelectedIcon: null,
    };
    expect(MultiSelect).toHaveBeenCalledWith(opts, {});
  });
});
