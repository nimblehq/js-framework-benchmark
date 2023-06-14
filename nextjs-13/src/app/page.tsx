'use client';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import Head from 'next/head';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CreateNewsletterModal from '@components/CreateNewsletterModal';
import ListNewsletter from '@components/ListNewsletter';
import requestManager from 'lib/request/manager';
import toast from 'lib/toast/makeToast';

const Home = () => {
  const { status } = useSession();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);

    try {
      const response = await requestManager('GET', 'v1/newsletter');

      setIsLoading(false);
      setRecords(response.records);
    } catch (error) {
      toast(error.message, 'error');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {isLoading ? (
            <ClipLoader loading={isLoading} size={75} />
          ) : (
            <ListNewsletter records={records} onAfterCloseCallback={getData} />
          )}
        </div>
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="home__create-button"
          >
            Create newsletter
          </button>
          <CreateNewsletterModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            onAfterCloseCallback={getData}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
