import { useState, useEffect } from 'react';

import NewsletterItem from '@components/NewsletterItem';
import requestManager from 'lib/request/manager';
import promiseWrapper from 'lib/request/promiseWrapper';

const ListNewsletter = () => {
  const [promise, setPromise] = useState();

  async function fetchRecords() {
    const res = await requestManager('GET', 'v1/newsletter');

    return res.records;
  }

  async function getData() {
    setPromise(promiseWrapper(fetchRecords()));
  }

  useEffect(() => {
    getData();
  }, []);

  const records = promise ? promise.read() : [];

  return (
    <>
      <div className="list-newsletter" data-testid="list-newsletter">
        <div>
          <ul className="">
            {/* <NewsletterItem item={records[0]} getData={getData} />; */}
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
