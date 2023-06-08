import React from 'react';
import { MultiSelect } from 'react-multi-select-component';

import { render, screen } from '@testing-library/react';

import MultiSelectWrapper from './index';

jest.mock('react-multi-select-component');

describe('MultiSelectWrapper', () => {
  it('renders the component', async () => {
    render(
      <MultiSelectWrapper
        records={[]}
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

    const selected = [records[0]];
    const setSelected = () => undefined;

    MultiSelect.mockImplementation(() => undefined);

    render(
      <MultiSelectWrapper
        records={records}
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
