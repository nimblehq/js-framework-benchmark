import { toast } from 'react-toastify';

export default async function makeToast(
  message: string,
  type: 'success' | 'error'
) {
  if (type === 'success') {
    return toast.success(message, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
    });
  }

  return toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
  });
}
