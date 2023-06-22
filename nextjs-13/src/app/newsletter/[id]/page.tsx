'use client';

import { Suspense, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useParams, redirect } from 'next/navigation';

import NewsletterDetail from '@components/NewsletterDetail';
import requestManager from 'lib/request/manager';
import makeToast from 'lib/toast/makeToast';

const ViewNewsletter = () => {
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const id = params.id;

  const getNewletter = async () => {
    setIsLoading(true);

    try {
      const response = await requestManager('GET', `v1/newsletter/${id}`);

      setIsLoading(false);
      setRecord(response.record);
    } catch (error) {
      makeToast(error.message, 'error');
      setIsLoading(false);
      redirect('/auth/sign-in');
    }
  };

  useEffect(() => {
    getNewletter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="view-newsletter" data-testid="view-newsletter">
      {isLoading ? (
        <ClipLoader isLoading={isLoading} size={75} />
      ) : (
        <NewsletterDetail newsletter={record} />
      )}
    </div>
  );
};

export default ViewNewsletter;
