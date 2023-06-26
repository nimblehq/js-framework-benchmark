'use server';

import {
  createNewsletter as createNewsletterAction,
  deleteNewsletter as deleteNewsletterAction,
  updateNewsletter as updateNewsletterAction,
  sendNewsletter as sendNewsletterAction,
} from './actions';

export const createNewsletter = createNewsletterAction;
export const deleteNewsletter = deleteNewsletterAction;
export const updateNewsletter = updateNewsletterAction;
export const sendNewsletter = sendNewsletterAction;
