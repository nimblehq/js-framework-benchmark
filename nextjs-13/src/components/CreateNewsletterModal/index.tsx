'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import Modal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';

import ClipLoader from 'react-spinners/ClipLoader';

import requestManager from 'lib/request/manager';
import toast from 'lib/toast/makeToast';

const customStyles = {
  content: {
    top: '25%',
    left: '15%',
    width: '70%',
    height: '50%',
  },
};

type Props = {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateNewsletterModal = ({ modalIsOpen, setIsOpen }: Props) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setName('');
    setContent('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await requestManager('POST', 'v1/newsletter', {
        data: {
          name,
          content,
        },
      });

      closeModal();
      setIsLoading(false);
      toast('Created newsletter success!', 'success');
    } catch (error) {
      setIsLoading(false);
      toast(error.message, 'error');
    }
  };

  return (
    <div data-testid="create-newsletter-modal">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <button onClick={closeModal} className="ReactModalPortal__btn-close">
          X
        </button>
        {isLoading ? (
          <ClipLoader
            isLoading={isLoading}
            size={150}
            className="ReactModalPortal__spinner"
          />
        ) : (
          <div data-testid="modal-content">
            <h3>Create your newsletter</h3>

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
                <button type="submit" className="ReactModalPortal__btn-submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CreateNewsletterModal;
