'use client';

import { Suspense, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import MultiSelectWrapper from '@components/MultiSelectWrapper';
import requestManager from 'lib/request/manager';
import makeToast from 'lib/toast/makeToast';

const SendNewsletter = () => {
  const [selected, setSelected] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const getNewletters = async () => {
    setIsLoading(true);

    try {
      const response = await requestManager('GET', 'v1/newsletter');

      setIsLoading(false);
      setRecords(response.records);
    } catch (error) {
      makeToast(error.message, 'error');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewletters();
  }, []);

  const afterSubmit = () => {
    setIsLoading(false);
    setSelected([]);
    setEmail('');
    getNewletters();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selected.length === 0) {
      return makeToast('Please select atleast one newsletter', 'error');
    }

    setIsLoading(true);

    try {
      await requestManager('POST', 'v1/newsletter/send', {
        data: {
          email,
          ids: selected.map((r) => r.value),
        },
      });

      makeToast('Send newsletter success!', 'success');
      afterSubmit();
    } catch (error) {
      makeToast(error.message, 'error');
      afterSubmit();
    }
  };

  return (
    <div className="send-newsletter" data-testid="send-newsletter">
      <div>
        <h3 data-testid="title">Your Newsletters</h3>
        {isLoading ? (
          <ClipLoader isLoading={isLoading} size={150} />
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label className="newsletter-label" htmlFor="email">
              Email
            </label>
            <br />

            <input
              type="text"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="text-input"
              placeholder={'Enter email'}
            />
            <br />

            <label className="newsletter-label" htmlFor="newsletters">
              Newsletters
            </label>
            <br />

            <Suspense fallback={<ClipLoader isLoading={true} size={150} />}>
              <MultiSelectWrapper
                records={records}
                selected={selected}
                setSelected={setSelected}
              />
            </Suspense>
            <div className="send-newsletter__footer">
              <button
                type="submit"
                className="send-newsletter__btn-submit"
                data-testid="btn-submit"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SendNewsletter;
