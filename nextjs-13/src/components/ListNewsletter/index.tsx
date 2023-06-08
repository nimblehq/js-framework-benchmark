import NewsletterItem from '@components/NewsletterItem';

interface Record {
  id: string;
  name: string;
}

interface PromiseWrapper {
  read: () => Record[];
}

interface Props {
  promise: PromiseWrapper;
  getData: () => undefined;
}

const ListNewsletter = ({ promise, getData }: Props) => {
  const records = promise ? promise.read() : [];

  return (
    <>
      <div className="list-newsletter" data-testid="list-newsletter">
        <div>
          <ul className="">
            {records.map((item) => (
              <NewsletterItem key={item.id} item={item} getData={getData} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListNewsletter;
