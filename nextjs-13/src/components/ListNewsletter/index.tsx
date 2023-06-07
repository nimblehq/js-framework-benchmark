import NewsletterItem from '@components/NewsletterItem';

const ListNewsletter = ({ promise }) => {
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
