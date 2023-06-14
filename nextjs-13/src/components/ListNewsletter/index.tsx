import NewsletterItem from '@components/NewsletterItem';

interface Record {
  id: string;
  name: string;
}

interface Props {
  records: Record[];
  onAfterCloseCallback: () => undefined;
}

const ListNewsletter = ({ records, onAfterCloseCallback }: Props) => {
  return (
    <div className="list-newsletter" data-testid="list-newsletter">
      <div>
        <ul className="newsletter-wrapper">
          {records.map((item) => (
            <NewsletterItem
              key={item.id}
              item={item}
              onAfterCloseCallback={onAfterCloseCallback}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListNewsletter;
