import { Notification } from '../types';

export function addNotification({ text, type }: Notification) {
  const notification = { text: text, type: type };

  localStorage.setItem('notification', JSON.stringify(notification));
}

export function getNotification(): Notification {
  const notification = localStorage.getItem('notification');

  if (!notification) {
    return { text: '', type: '' };
  }

  return JSON.parse(notification);
}

export function removeNotification() {
  localStorage.removeItem('notification');
}
