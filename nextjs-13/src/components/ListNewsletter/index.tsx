import NewsletterItem from '@components/NewsletterItem';

const ListNewsletter = ({ promise, getData }) => {
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
