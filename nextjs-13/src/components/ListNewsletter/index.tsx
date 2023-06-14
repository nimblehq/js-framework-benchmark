interface Record {
  id: string;
  name: string;
}

interface Props {
  records: Record[];
}

const ListNewsletter = ({ records }: Props) => {
  return (
    <div className="list-newsletter" data-testid="list-newsletter">
      <div>
        <ul className="newsletter-wrapper">
          {records.map((item) => {
            return (
              <li className="newsletter-item" key={item.id}>
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ListNewsletter;
