import { useState, useEffect } from 'react';

import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import requestManager from 'lib/request/manager';
import promiseWrapper from 'lib/request/promiseWrapper';

const ListNewsletter = () => {
  const [promise, setPromise] = useState();
  const MySwal = withReactContent(Swal);

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

  const handleDelete = async (id) => {
    MySwal.fire(
      'Are you sure?',
      'You will not be able to retrieve this newsletter.',
      'warning'
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          MySwal.fire('Deleting', 'Deleting...');
          await requestManager('DELETE', `v1/newsletter/${id}`);
          MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');

          getData();
        } catch (error) {
          MySwal.fire('Something went wrong.', error.message, 'error');
        }
      }
    });
  };

  return (
    <>
      <div className="list-newsletter" data-testid="list-newsletter">
        <div>
          <ul className="">
            {records.map((item) => {
              return (
                <li className="" key={item.id}>
                  <span className="">{item.name}</span>
                  <Image
                    src={`/images/icons/trash.svg`}
                    alt={'Log out button'}
                    width={16}
                    height={16}
                    onClick={() => handleDelete(item.id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListNewsletter;
