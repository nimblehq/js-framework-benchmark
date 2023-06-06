import toast from 'react-hot-toast';

export default function makeToast(toastMode: string, toastMessage: string) {
  if (toastMode === 'success') {
    toast.success(toastMessage);
  } else if (toastMode === 'error') {
    toast.error(toastMessage);
  } else {
    toast(toastMessage);
  }
}
