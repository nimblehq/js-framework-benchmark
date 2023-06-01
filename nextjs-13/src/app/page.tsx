'use client';
import { Suspense, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import Head from 'next/head';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CreateNewsletterModal from '@components/CreateNewsletterModal';
import ListNewsletter from '@components/ListNewsletter';

const Home = () => {
  const { status } = useSession();
  const [modalIsOpen, setIsOpen] = useState(false);

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
            <ListNewsletter />
          </Suspense>
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
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
