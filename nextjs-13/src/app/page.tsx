'use client';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import Head from 'next/head';

import ListNewsletter from '@components/ListNewsletter';
import NewsletterModal, {
  FormAction,
  Newsletter,
} from '@components/NewsletterModal';
import requestManager from 'lib/request/manager';
import toast from 'lib/toast/makeToast';

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formAction, setFormAction] = useState<FormAction>('create');
  const [currentNewsletter, setCurrentNewsletter] =
    useState<Newsletter>(undefined);

  const getNewletters = async () => {
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
    getNewletters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openCreateModal() {
    setFormAction('create');
    setIsOpen(true);
  }

  async function openUpdateModal(item) {
    setFormAction('update');
    setIsOpen(true);
    setCurrentNewsletter({
      ...{
        id: item.id,
        name: item.name,
        content: item.content,
      },
    });
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
            <ListNewsletter
              records={records}
              refreshRecordListCallback={getNewletters}
              openUpdateModal={openUpdateModal}
            />
          )}
        </div>
        <div>
          <button onClick={openCreateModal} className="home__create-button">
            Create newsletter
          </button>
          <NewsletterModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            onAfterCloseCallback={getNewletters}
            currentNewsletter={currentNewsletter}
            formAction={formAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
