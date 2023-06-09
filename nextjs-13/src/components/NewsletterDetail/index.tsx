'use client';

const NewsletterDetail = ({ promise }) => {
  const newsletter = promise ? promise.read() : {};

  return (
    <div className="newsletter" data-testid="newsletter">
      <h3 className="name">{newsletter.name}</h3>
      <p className="content">{newsletter.content}</p>
      <br />
    </div>
  );
};

export default NewsletterDetail;
