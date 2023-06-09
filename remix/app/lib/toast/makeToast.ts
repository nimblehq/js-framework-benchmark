import toast from 'react-hot-toast';

export default function makeToast(
  toastMode: string | null,
  toastMessage: string | null
) {
  switch (toastMode) {
    case 'success':
      return toast.success(toastMessage);
    case 'error':
      return toast.error(toastMessage);
    default:
      return toast(toastMessage);
  }
}
