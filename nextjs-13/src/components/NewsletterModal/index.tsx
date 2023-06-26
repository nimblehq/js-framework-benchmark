'use client';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import Modal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';

import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

import { createNewsletter, updateNewsletter } from 'app/actions/newsletter';
import toast from 'lib/toast/makeToast';

const customStyles = {
  content: {
    top: '25%',
    left: '15%',
    width: '70%',
    height: '50%',
  },
};

export type FormAction = 'create' | 'update';
export type Newsletter =
  | {
      id: string;
      name: string;
      content: string;
    }
  | undefined;

export type Props = {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onAfterCloseCallback: () => void;
  formAction: FormAction;
  currentNewsletter: Newsletter;
};

const NewsletterModal = ({
  modalIsOpen,
  setIsOpen,
  onAfterCloseCallback,
  formAction,
  currentNewsletter,
}: Props) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const startTransition = useTransition()[1];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentNewsletter) {
      setName(currentNewsletter.name);
      setContent(currentNewsletter.content);
    }
  }, [currentNewsletter]);

  const onRequestClose = () => {
    setIsOpen(false);
    setName('');
    setContent('');
    onAfterCloseCallback();
  };

  const action = `${formAction === 'create' ? 'Create' : 'Update'}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    startTransition(async () => {
      try {
        if (formAction === 'create') {
          await createNewsletter({ name, content });
        } else {
          await updateNewsletter({ id: currentNewsletter?.id, name, content });
        }

        setIsLoading(false);
        toast(`${action} newsletter success!`, 'success');
        onRequestClose();
      } catch (error) {
        setIsLoading(false);
        toast(error.message, 'error');
      }
    });
  };

  return (
    <div data-testid="newsletter-modal">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        ariaHideApp={false}
      >
        <button
          onClick={onRequestClose}
          className="ReactModalPortal__btn-close"
        >
          X
        </button>
        {isLoading ? (
          <ClipLoader
            loading={isLoading}
            size={75}
            className="ReactModalPortal__spinner"
          />
        ) : (
          <div data-testid="modal-content">
            <h3 data-testid="title">{`${action} your newsletter`}</h3>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <br />

              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <br />

              <label htmlFor="content">Content</label>
              <br />

              <TextareaAutosize
                minRows={5}
                id="content"
                required
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
              <br />

              <div className="ReactModalPortal__modal-footer">
                <div></div>
                <button
                  type="submit"
                  className="ReactModalPortal__btn-submit"
                  data-testid="btn-submit"
                >
                  {action}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsletterModal;
