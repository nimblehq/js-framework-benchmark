import toast from 'react-hot-toast';

export default function makeToast(toastMode: string, toastMessage: string) {
  if (toastMode === 'success') {
    return toast.success(toastMessage);
  } else if (toastMode === 'error') {
    return toast.error(toastMessage);
  } else {
    return toast(toastMessage);
  }
}
