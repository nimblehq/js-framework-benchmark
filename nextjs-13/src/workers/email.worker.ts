import { Worker, Queue } from 'bullmq';

import sendMail from './sendMail';

export const sendMailQueue = new Queue('sendMailQueue');

const worker = new Worker('sendMailQueue', async (job) => {
  sendMail(job);
});

export default worker;
