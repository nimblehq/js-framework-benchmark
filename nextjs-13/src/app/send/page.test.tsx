import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';

import { errorMessageList } from 'lib/request/error';
import requestManager from 'lib/request/manager';

import SendNewsletter from './page';

jest.mock('lib/request/manager');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SendNewsletter', () => {
  beforeEach(() => {
    requestManager.mockResolvedValue({ records: [] });
  });

  it('renders the component', async () => {
    render(<SendNewsletter />);

    await waitFor(() =>
      expect(screen.getByTestId('send-newsletter')).toBeVisible()
    );
  });

  it('renders title text correctly', async () => {
    render(<SendNewsletter />);

    const titleElement = screen.getByTestId('title');

    await waitFor(() => expect(titleElement).toBeInTheDocument());
    await waitFor(() =>
      expect(titleElement).toHaveTextContent('Your Newsletters')
    );
  });

  it('renders button text correctly', async () => {
    render(<SendNewsletter />);

    const titleElement = await screen.findByTestId('btn-submit');

    await waitFor(() => expect(titleElement).toBeInTheDocument());
    await waitFor(() => expect(titleElement).toHaveTextContent('Send'));
  });

  it('enters name', async () => {
    render(<SendNewsletter />);

    const nameInput = await screen.findByLabelText('Email');

    fireEvent.change(nameInput, { target: { value: 'dev@nimblehq.co' } });

    await waitFor(() => expect(nameInput.value).toBe('dev@nimblehq.co'));
  });

  it('creates newsletter successfully', async () => {
    const stateMock = (_) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useState([{ value: 1 }]);
    };

    jest.spyOn(React, 'useState').mockImplementationOnce(stateMock);

    render(<SendNewsletter />);

    const emailInput = await screen.findByLabelText('Email');
    const sendButton = await screen.findByText('Send');

    fireEvent.change(emailInput, { target: { value: 'dev@nimblehq.co' } });
    fireEvent.submit(sendButton);

    await waitFor(() => {
      expect(requestManager).toHaveBeenCalledWith(
        'POST',
        'v1/newsletter/send',
        {
          data: { email: 'dev@nimblehq.co', ids: [1] },
        }
      );
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Send newsletter success!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
      });
    });
  });

  it('raises error if invalid newsletter', async () => {
    render(<SendNewsletter />);

    const emailInput = await screen.findByLabelText('Email');
    const sendButton = await screen.findByText('Send');

    fireEvent.change(emailInput, { target: { value: 'dev@nimblehq.co' } });
    fireEvent.submit(sendButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Please select atleast one newsletter',
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
        }
      );
    });
  });

  it('handles form submission error', async () => {
    const stateMock = (_) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useState([{ value: 1 }]);
    };

    jest.spyOn(React, 'useState').mockImplementationOnce(stateMock);

    const mockRequest = (method) => {
      if (method === 'GET') {
        return { records: [] };
      } else {
        throw Error(errorMessageList[StatusCodes.UNPROCESSABLE_ENTITY]);
      }
    };

    requestManager.mockImplementation(mockRequest);

    render(<SendNewsletter />);

    const emailInput = await screen.findByLabelText('Email');
    const sendButton = await screen.findByText('Send');

    fireEvent.change(emailInput, { target: { value: 'dev@nimblehq.co' } });
    fireEvent.submit(sendButton);

    await waitFor(() => {
      expect(requestManager).toHaveBeenCalledWith(
        'POST',
        'v1/newsletter/send',
        {
          data: { email: 'dev@nimblehq.co', ids: [1] },
        }
      );
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        errorMessageList[StatusCodes.UNPROCESSABLE_ENTITY],
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
        }
      );
    });
  });
});
