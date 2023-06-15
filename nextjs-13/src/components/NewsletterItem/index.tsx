import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import requestManager from 'lib/request/manager';

interface Props {
  item: {
    id: string;
    name: string;
  };
  refreshRecordListCallback: () => undefined;
}

const NewsletterItem = ({ item, refreshRecordListCallback }: Props) => {
  const MySwal = withReactContent(Swal);

  const handleDelete = async () => {
    MySwal.fire(
      'Are you sure?',
      'You will not be able to retrieve this newsletter.',
      'warning'
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          MySwal.fire('Deleting', 'Deleting...');
          await requestManager('DELETE', `v1/newsletter/${item.id}`);
          MySwal.fire(
            'Deleted!',
            'Your newsletter has been deleted.',
            'success'
          );

          refreshRecordListCallback();
        } catch (error) {
          MySwal.fire('Something went wrong.', error.message, 'error');
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
