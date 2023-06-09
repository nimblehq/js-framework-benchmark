'use client';

import { Suspense, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useParams, redirect } from 'next/navigation';

import NewsletterDetail from '@components/NewsletterDetail';
import requestManager from 'lib/request/manager';
import promiseWrapper from 'lib/request/promiseWrapper';

const ViewNewsletter = () => {
  const [promise, setPromise] = useState();

  const params = useParams();
  const id = params.id;

  async function fetchRecords() {
    try {
      const res = await requestManager('GET', `v1/newsletter/${id}`);

      return res.record;
    } catch (error) {
      redirect('/auth/sign-in');
    }
  }

  useEffect(() => {
    setPromise(promiseWrapper(fetchRecords()));
  }, []);

  return (
    <div className="view-newsletter" data-testid="view-newsletter">
      <Suspense fallback={<ClipLoader loading={true} size={150} />}>
        <NewsletterDetail promise={promise} />
      </Suspense>
    </div>
  );
};

export default ViewNewsletter;
