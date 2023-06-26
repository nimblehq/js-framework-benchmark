import { useTransition } from 'react';

import Image from 'next/image';

import { deleteNewsletter } from 'app/actions/newsletter';
import showAlert from 'lib/showAlert';

interface Props {
  item: {
    id: string;
    name: string;
  };
  refreshRecordListCallback: () => undefined;
  openUpdateModal: () => undefined;
}

const NewsletterItem = ({
  item,
  refreshRecordListCallback,
  openUpdateModal,
}: Props) => {
  const startTransition = useTransition()[1];

  const handleDelete = async () => {
    showAlert(
      'Are you sure?',
      'You will not be able to retrieve this newsletter.',
      'warning'
    ).then(async (result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          try {
            showAlert('Deleting', 'Deleting...');
            await deleteNewsletter(item.id);
            showAlert('Deleted!', 'Your file has been deleted.', 'success');

            refreshRecordListCallback();
          } catch (error) {
            showAlert('Something went wrong.', error.message, 'error');
          }
        });
      }
    });
  };

  const handleUpdate = async () => {
    openUpdateModal(item);
  };

  return (
    <li
      className="list-newsletter__newsletter-item"
      data-testid="newsletter-item"
    >
      <span className="list-newsletter__newsletter-name">{item.name}</span>
      <div className="list-newsletter__list-icon">
        <button
          className="list-newsletter__newsletter-button"
          onClick={handleUpdate}
          data-testid="btn-edit"
        >
          <Image
            src={`/images/icons/edit.svg`}
            alt={'Update button'}
            width={16}
            height={16}
          />
        </button>
        <button
          className="list-newsletter__newsletter-button"
          onClick={handleDelete}
          data-testid="btn-delete"
        >
          <Image
            src={`/images/icons/trash.svg`}
            alt={'Delete button'}
            width={16}
            height={16}
          />
        </button>
      </div>
    </li>
  );
};

export default NewsletterItem;
