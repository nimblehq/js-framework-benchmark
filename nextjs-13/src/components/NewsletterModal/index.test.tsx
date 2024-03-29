import React from 'react';
import { toast } from 'react-toastify';

import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';

import { createNewsletter, updateNewsletter } from 'app/actions/newsletter';
import RequestError, { errorMessageList } from 'lib/request/error';

import NewsletterModal, { Props } from './index';

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
jest.mock('app/actions/newsletter', () => ({
  createNewsletter: jest.fn(),
  updateNewsletter: jest.fn(),
}));

type OmittableProps = Partial<Props>;

const NewsletterModalWrapper = ({
  modalIsOpen,
  setIsOpen,
  onAfterCloseCallback,
  formAction,
  currentNewsletter,
}: OmittableProps) => {
  return (
    <NewsletterModal
      modalIsOpen={modalIsOpen ?? true}
      setIsOpen={setIsOpen ?? (() => undefined)}
      onAfterCloseCallback={onAfterCloseCallback ?? (() => undefined)}
      formAction={formAction ?? 'create'}
      currentNewsletter={currentNewsletter ?? undefined}
    />
  );
};

describe('NewsletterModal', () => {
  it('renders without modal initially', () => {
    render(<NewsletterModalWrapper modalIsOpen={false} />);

    const modalElement = screen.queryByTestId('modal-content');

    expect(modalElement).toBeNull();
  });

  it('renders with modal when open', () => {
    render(<NewsletterModalWrapper modalIsOpen={true} />);

    const modalElement = screen.queryByTestId('modal-content');

    expect(modalElement).toBeInTheDocument();
  });

  it('closes the modal when trigger close', () => {
    const setIsOpenMock = jest.fn();
    render(<NewsletterModalWrapper setIsOpen={setIsOpenMock} />);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });

  it('enters name', () => {
    render(<NewsletterModalWrapper />);

    const nameInput = screen.getByLabelText('Name');

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });

    expect(nameInput.value).toBe('Test Name');
  });

  it('enters content', () => {
    render(<NewsletterModalWrapper />);

    const contentTextarea = screen.getByLabelText('Content');

    fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });

    expect(contentTextarea.value).toBe('Test Content');
  });

  describe('formAction', () => {
    describe('formAction is "create"', () => {
      it('renders title text correctly', async () => {
        render(<NewsletterModalWrapper formAction="create" />);

        const titleElement = screen.getByTestId('title');

        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Create your newsletter');
      });

      it('renders button text correctly', async () => {
        render(<NewsletterModalWrapper formAction="create" />);

        const titleElement = screen.getByTestId('btn-submit');

        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Create');
      });

      it('creates newsletter successfully', async () => {
        const onAfterCloseCallback = jest.fn();
        const setIsOpen = jest.fn();

        render(
          <NewsletterModalWrapper
            onAfterCloseCallback={onAfterCloseCallback}
            setIsOpen={setIsOpen}
            formAction="create"
          />
        );

        const nameInput = screen.getByLabelText('Name');
        const contentTextarea = screen.getByLabelText('Content');
        const createButton = screen.getByText('Create');

        fireEvent.change(nameInput, { target: { value: 'Test Name' } });
        fireEvent.change(contentTextarea, {
          target: { value: 'Test Content' },
        });
        fireEvent.submit(createButton);

        await waitFor(() => {
          expect(createNewsletter).toHaveBeenCalledWith({
            name: 'Test Name',
            content: 'Test Content',
          });
        });
        await waitFor(() => {
          expect(onAfterCloseCallback).toHaveBeenCalled();
        });
        await waitFor(() => {
          expect(setIsOpen).toHaveBeenCalledWith(false);
        });
        await waitFor(() => {
          expect(toast.success).toHaveBeenCalledWith(
            'Create newsletter success!',
            {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
            }
          );
        });
      });
    });

    describe('formAction is "update"', () => {
      it('renders title text correctly', async () => {
        render(<NewsletterModalWrapper formAction="update" />);

        const titleElement = screen.getByTestId('title');

        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Update your newsletter');
      });

      it('renders button text correctly', async () => {
        render(<NewsletterModalWrapper formAction="update" />);

        const titleElement = screen.getByTestId('btn-submit');

        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Update');
      });

      it('updates newsletter successfully', async () => {
        const onAfterCloseCallback = jest.fn();
        const setIsOpen = jest.fn();
        const currentNewsletter = {
          id: '1',
          name: 'Old name',
          content: 'Old content',
        };

        render(
          <NewsletterModalWrapper
            onAfterCloseCallback={onAfterCloseCallback}
            setIsOpen={setIsOpen}
            formAction="update"
            currentNewsletter={currentNewsletter}
          />
        );

        const nameInput = screen.getByLabelText('Name');
        const contentTextarea = screen.getByLabelText('Content');
        const updateButton = screen.getByText('Update');
        const newData = {
          id: currentNewsletter.id,
          name: 'Old name',
          content: 'Old content',
        };

        fireEvent.change(nameInput, { target: { value: newData.name } });
        fireEvent.change(contentTextarea, {
          target: { value: newData.content },
        });
        fireEvent.submit(updateButton);

        await waitFor(() => {
          expect(updateNewsletter).toHaveBeenCalledWith(newData);
        });
        await waitFor(() => {
          expect(onAfterCloseCallback).toHaveBeenCalled();
        });
        await waitFor(() => {
          expect(setIsOpen).toHaveBeenCalledWith(false);
        });
        await waitFor(() => {
          expect(toast.success).toHaveBeenCalledWith(
            'Update newsletter success!',
            {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
            }
          );
        });
      });
    });
  });

  it('handles form submission error', async () => {
    createNewsletter.mockImplementation(() => {
      throw new RequestError({
        message: errorMessageList[StatusCodes.UNPROCESSABLE_ENTITY],
      });
    });

    render(<NewsletterModalWrapper formAction="create" />);

    const nameInput = screen.getByLabelText('Name');
    const contentTextarea = screen.getByLabelText('Content');
    const createButton = screen.getByText('Create');

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(contentTextarea, { target: { value: '' } });
    fireEvent.submit(createButton);

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
