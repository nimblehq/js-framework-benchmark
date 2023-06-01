export type Newsletter = {
  name: string;
  content: string;
  user: { connect: { id: string } };
};
