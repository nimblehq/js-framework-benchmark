import React from 'react';
import { toast } from 'react-toastify';

import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import requestManager from 'lib/request/manager';

import CreateOrUpdateNewsletterModal from './index';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(),
}));

jest.mock('lib/request/manager', () => jest.fn());

// refs: https://github.com/Andarist/react-textarea-autosize#how-to-test-it-with-jest-and-react-test-renderer-if-you-need-ref
jest.mock('react-textarea-autosize', () => {
  const TextareaAutosizeMock = jest.fn((props) => (
    <textarea
      id="content"
      onChange={(event) => {
        props.onChange(event); // Call the provided onChange callback
      }}
      value={props.value}
    />
  ));

  return TextareaAutosizeMock;
});

describe('CreateOrUpdateNewsletterModal', () => {
  it('renders without modal initially', () => {
    render(
      <CreateOrUpdateNewsletterModal
        modalIsOpen={false}
        onAfterCloseCallback={() => undefined}
        setIsOpen={() => undefined}
      />
    );

    const modalElement = screen.queryByTestId('modal-content');

    expect(modalElement).toBeNull();
  });

  it('renders with modal when open', () => {
    render(
      <CreateOrUpdateNewsletterModal
        modalIsOpen={true}
        onAfterCloseCallback={() => undefined}
        setIsOpen={() => undefined}
      />
    );

    const modalElement = screen.queryByTestId('modal-content');

    expect(modalElement).toBeInTheDocument();
  });

  it('closes the modal', () => {
    const setIsOpenMock = jest.fn();

    render(
      <CreateOrUpdateNewsletterModal
        modalIsOpen={true}
        onAfterCloseCallback={setIsOpenMock}
        setIsOpen={setIsOpenMock}
      />
    );

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });

  it('sets the name field when entering name', () => {
    render(
      <CreateOrUpdateNewsletterModal
        modalIsOpen={true}
        onAfterCloseCallback={() => undefined}
        setIsOpen={() => undefined}
      />
    );

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });

    expect(nameInput.value).toBe('Test Name');
  });

  it('sets the content field when entering content', () => {
    render(
      <CreateOrUpdateNewsletterModal
        modalIsOpen={true}
        onAfterCloseCallback={() => undefined}
        setIsOpen={() => undefined}
      />
    );

    const contentTextarea = screen.getByLabelText('Content');
    fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });

    expect(contentTextarea.value).toBe('Test Content');
  });

  it('submits the form successfully', async () => {
    render(
      <CreateOrUpdateNewsletterModal
        modalIsOpen={true}
        onAfterCloseCallback={() => undefined}
        setIsOpen={() => undefined}
      />
    );

    const nameInput = screen.getByLabelText('Name');
    const contentTextarea = screen.getByLabelText('Content');
    const createButton = screen.getByText('Create');

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });
    fireEvent.submit(createButton);

    await waitFor(() => {
      expect(requestManager).toHaveBeenCalledWith('POST', 'v1/newsletter', {
        data: { name: 'Test Name', content: 'Test Content' },
      });
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Created newsletter success!',
        {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
        }
      );
    });
  });

  it('handles form submission error', async () => {
    requestManager.mockRejectedValue(new Error('Invalid params'));

    render(
      <CreateOrUpdateNewsletterModal
        modalIsOpen={true}
        onAfterCloseCallback={() => undefined}
        setIsOpen={() => undefined}
      />
    );

    const nameInput = screen.getByLabelText('Name');
    const contentTextarea = screen.getByLabelText('Content');
    const createButton = screen.getByText('Create');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Test Name' } });
      fireEvent.change(contentTextarea, { target: { value: '' } });
      fireEvent.submit(createButton);
    });

    expect(requestManager).toHaveBeenCalledWith('POST', 'v1/newsletter', {
      data: { name: 'Test Name', content: '' },
    });
    expect(toast.error).toHaveBeenCalledWith('Invalid params', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
    });
  });
});
