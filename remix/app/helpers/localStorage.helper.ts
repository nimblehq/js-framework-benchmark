export function setToastItems(toastMode: string, toastMessage: string) {
  localStorage.setItem('toastMode', toastMode);
  localStorage.setItem('toastMessage', toastMessage);
}

export function getToastItems() {
  const toastMode = localStorage.getItem('toastMode');
  const toastMessage = localStorage.getItem('toastMessage');

  return { toastMode, toastMessage };
}

export function removeToastItems() {
  localStorage.removeItem('toastMessage');
  localStorage.removeItem('toastMode');
}
