import NewsletterItem from '@components/NewsletterItem';

interface Record {
  id: string;
  name: string;
}

interface Props {
  records: Record[];
  refreshRecordListCallback: () => undefined;
  openUpdateModal: () => undefined;
}

const ListNewsletter = ({
  records,
  refreshRecordListCallback,
  openUpdateModal,
}: Props) => {
  return (
    <div className="list-newsletter" data-testid="list-newsletter">
      <div>
        <ul className="list-newsletter__newsletter-wrapper">
          {records.map((item) => (
            <NewsletterItem
              key={item.id}
              item={item}
              refreshRecordListCallback={refreshRecordListCallback}
              openUpdateModal={openUpdateModal}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListNewsletter;
