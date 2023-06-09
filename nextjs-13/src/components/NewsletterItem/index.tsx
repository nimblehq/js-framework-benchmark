import { useTransition } from 'react';

import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { deleteNewsletter } from 'app/actions/actions';

interface Props {
  item: {
    id: string;
    name: string;
  };
  getData: () => undefined;
}

const NewsletterItem = ({ item, getData }: Props) => {
  const MySwal = withReactContent(Swal);
  const [_, startTransition] = useTransition();

  const handleDelete = async () => {
    MySwal.fire(
      'Are you sure?',
      'You will not be able to retrieve this newsletter.',
      'warning'
    ).then(async (result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          try {
            MySwal.fire('Deleting', 'Deleting...');
            await deleteNewsletter(item.id);

            MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
            getData();
          } catch (error) {
            MySwal.fire('Something went wrong.', error.message, 'error');
          }
        });
      }
    });
  };

  return (
    <li data-testid="newsletter-item">
      <span>{item.name}</span>
      <Image
        src={`/images/icons/trash.svg`}
        alt={'Delete button'}
        width={16}
        height={16}
        onClick={handleDelete}
        data-testid="btn-delete"
      />
    </li>
  );
};

export default NewsletterItem;
