import { useState, useEffect } from 'react';

import requestManager from 'lib/request/manager';
import promiseWrapper from 'lib/request/promiseWrapper';

const ListNewsletter = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getData = () => {
      const promise = requestManager('GET', 'v1/newsletter').then(
        (res) => res.records
      );
      setRecords(promiseWrapper(promise));
    };

    getData();
  }, []);

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
