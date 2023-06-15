import { MultiSelect, Option } from 'react-multi-select-component';

interface Record {
  id: string;
  name: string;
}

interface Props {
  records: Record[];
  selected: Option[];
  setSelected: () => undefined;
}

const MultiSelectWrapper = ({ records, selected, setSelected }: Props) => {
  const options = records.map((r) => {
    return {
      label: r.name,
      value: r.id,
    };
  });

  return (
    <div className="multi-select-wrapper" data-testid="multi-select-wrapper">
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        ClearSelectedIcon={null}
        className="react-multi-select"
        labelledBy="Select"
      />
    </div>
  );
};

export default MultiSelectWrapper;
