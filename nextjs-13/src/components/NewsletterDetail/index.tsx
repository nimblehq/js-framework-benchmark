'use client';

interface Record {
  id: string;
  name: string;
  content: string;
}

interface Props {
  newsletter: Record;
}

const NewsletterDetail = ({ newsletter }: Props) => {
  return (
    <div className="newsletter" data-testid="newsletter">
      <h3 className="name">{newsletter.name}</h3>
      <p className="content">{newsletter.content}</p>
      <br />
    </div>
  );
};

export default NewsletterDetail;
