import Image from 'next/image';

import requestManager from 'lib/request/manager';
import showAlert from 'lib/showAlert';

interface Props {
  item: {
    id: string;
    name: string;
  };
  refreshRecordListCallback: () => undefined;
}

const NewsletterItem = ({ item, refreshRecordListCallback }: Props) => {
  const handleDelete = async () => {
    showAlert(
      'Are you sure?',
      'You will not be able to retrieve this newsletter.',
      'warning'
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          showAlert('Deleting', 'Deleting...');
          await requestManager('DELETE', `v1/newsletter/${item.id}`);
          showAlert('Deleted!', 'Your newsletter has been deleted.', 'success');

          refreshRecordListCallback();
        } catch (error) {
          showAlert('Something went wrong.', error.message, 'error');
        }
      }
    });
  };

  return (
    <li
      className="list-newsletter__newsletter-item"
      data-testid="newsletter-item"
    >
      <span className="list-newsletter__newsletter-name">{item.name}</span>
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
    </li>
  );
};

export default NewsletterItem;
