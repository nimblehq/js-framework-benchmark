import { MultiSelect } from 'react-multi-select-component';

const MultiSelectWrapper = ({ promise, selected, setSelected }) => {
  const records = (promise ? promise.read() : []).map((r) => {
    return {
      label: r.name,
      value: r.id,
    };
  });

  return (
    <>
      <div className="list-newsletter" data-testid="list-newsletter">
        <div>
          <ul className="">
            <MultiSelect
              options={records}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

export default MultiSelectWrapper;
