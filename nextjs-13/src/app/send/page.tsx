'use client';

import { Suspense, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import MultiSelectWrapper from '@components/MultiSelectWrapper';
import requestManager from 'lib/request/manager';
import promiseWrapper from 'lib/request/promiseWrapper';

const Home = () => {
  const { status } = useSession();
  const [selected, setSelected] = useState([]);
  const [promise, setPromise] = useState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

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

  if (status === 'unauthenticated') {
    redirect('/auth/sign-in');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await requestManager('POST', 'v1/newsletter/send', {
        data: {
          email,
          ids: selected.map((r) => r.value),
        },
      });

      setLoading(false);
      getData();
      console.log('========>done : ');

      // toast.success(`${action} newsletter success!`, {
      //   position: 'top-center',
      //   autoClose: 1000,
      //   hideProgressBar: false,
      // });
    } catch (error) {
      console.log('========>error : ', error);
      setLoading(false);

      // toast.error(error.message, {
      //   position: 'top-center',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      // });
    }
  };

  return (
    <div className="send-newsletter">
      <div>
        <h3>Your Newsletters</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />

          <input
            type="text"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={'Enter email'}
          />
          <br />

          <label htmlFor="newsletters">Newsletters</label>
          <br />

          <Suspense fallback={<ClipLoader loading={true} size={150} />}>
            <MultiSelectWrapper
              promise={promise}
              selected={selected}
              setSelected={setSelected}
            />
          </Suspense>
          <div className="send-newsletter__footer">
            <button type="submit" className="send-newsletter__btn-submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
