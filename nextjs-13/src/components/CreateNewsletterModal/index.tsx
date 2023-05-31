'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import Modal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ClipLoader from 'react-spinners/ClipLoader';

import requestManager from 'lib/request/manager';

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
  console.log('========>requestManager : ', requestManager);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setName('');
    setContent('');
  };
  console.log('========>content : ', content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await requestManager('POST', 'v1/newsletter', {
        data: {
          name,
          content,
        },
      });
      console.log('========>222 : ', 222);

      closeModal();
      setLoading(false);
      toast.success('Created newsletter success!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log('========>111 : ', 111);
      setLoading(false);
      console.log('========>error : ', error);
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div data-testid="create-newsletter-modal">
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <button onClick={closeModal} className="ReactModalPortal__btn-close">
          X
        </button>
        {loading ? (
          <ClipLoader
            loading={loading}
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

              {/* <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea> */}
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
