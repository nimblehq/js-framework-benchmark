'use client';

import { Suspense, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import MultiSelectWrapper from '@components/MultiSelectWrapper';
import requestManager from 'lib/request/manager';
import promiseWrapper from 'lib/request/promiseWrapper';
import makeToast from 'lib/toast/makeToast';

const SendNewsletter = () => {
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

  const afterSubmit = () => {
    setLoading(false);
    setSelected([]);
    setEmail('');
    getData();
  };

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

      makeToast(`Send newsletter success!`, 'success');
      afterSubmit();
    } catch (error) {
      makeToast(error.message, 'error');
      afterSubmit();
    }
  };

  return (
    <div className="send-newsletter" data-testid="send-newsletter">
      <div>
        <h3>Your Newsletters</h3>
        {loading ? (
          <ClipLoader loading={loading} size={150} />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default SendNewsletter;
