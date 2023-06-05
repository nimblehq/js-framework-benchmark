import NewsletterItem from '@components/NewsletterItem';

interface Record {
  id: string;
  name: string;
}

interface Props {
  records: Record[];
  getData: () => undefined;
}

const ListNewsletter = ({ records, getData }: Props) => {
  return (
    <div className="list-newsletter" data-testid="list-newsletter">
      <div>
        <ul className="newsletter-wrapper">
          {records.map((item) => (
            <NewsletterItem key={item.id} item={item} getData={getData} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListNewsletter;
