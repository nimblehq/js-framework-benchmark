interface Record {
  id: string;
  name: string;
}

interface PromiseWrapper {
  read: () => Record[];
}

interface Props {
  promise: PromiseWrapper;
}

const ListNewsletter = ({ promise }: Props) => {
  const records = promise ? promise.read() : [];

  return (
    <div className="list-newsletter" data-testid="list-newsletter">
      <div>
        <ul className="">
          {records.map((item) => {
            return (
              <li className="" key={item.id}>
                <span className="">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ListNewsletter;
