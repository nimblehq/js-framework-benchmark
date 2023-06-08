import { MultiSelect } from 'react-multi-select-component';

const MultiSelectWrapper = ({ records, selected, setSelected }) => {
  const options = records.map((r) => {
    return {
      label: r.name,
      value: r.id,
    };
  });

  return (
    <div className="multi-select-wrapper" data-testid="multi-select-wrapper">
      <ul>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          ClearSelectedIcon={null}
          className="react-multi-select"
          labelledBy="Select"
        />
      </ul>
    </div>
  );
};

export default MultiSelectWrapper;
