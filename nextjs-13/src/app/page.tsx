'use client';
import { Suspense, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import Head from 'next/head';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ListNewsletter from '@components/ListNewsletter';
import requestManager from 'lib/request/manager';
import promiseWrapper from 'lib/request/promiseWrapper';
import CreateNewsletterModal from '@components/CreateNewsletterModal';

const Home = () => {
  const { status } = useSession();
  const [modalIsOpen, setIsOpen] = useState(false);
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

  if (status === 'unauthenticated') {
    redirect('/auth/sign-in');
  }

  return (
    <div className="home">
      <Head>
        <title>Welcome to NextNewsletter 🚀</title>
      </Head>
      <div className="home__nav">
        <div className="home__tab">Newsletter</div>
      </div>
      <div className="home__dashboard">
        <div>
          <h3>Your Newsletters</h3>
          <Suspense fallback={<ClipLoader loading={true} size={150} />}>
            <ListNewsletter
              promise={promise}
              getData={getData}
            />
          </Suspense>
        </div>
        <div>
          <button onClick={() => setIsOpen(true)} className="home__create-button">
            Create newsletter
          </button>
          <CreateNewsletterModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
