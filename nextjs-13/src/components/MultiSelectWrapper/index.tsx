import { MultiSelect } from 'react-multi-select-component';

const MultiSelectWrapper = ({ promise, selected, setSelected }) => {
  const records = (promise ? promise.read() : []).map((r) => {
    return {
      label: r.name,
      value: r.id,
    };
  });

  return (
    <div className="multi-select-wrapper" data-testid="multi-select-wrapper">
      <ul>
        <MultiSelect
          options={records}
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
