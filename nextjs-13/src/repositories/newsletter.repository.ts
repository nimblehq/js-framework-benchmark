import dbClient from '../config/database';
import { Newsletter } from '../models/newsletter.model';

const createNewsletter = async (newsletterAttributes: Newsletter) =>
  dbClient.newsletter.create({ data: newsletterAttributes });

export { createNewsletter };
