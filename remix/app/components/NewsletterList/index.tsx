import { Newsletter } from '@prisma/client';

interface NewsletterListProps {
  newsletters: Newsletter[];
}

export default function NewsletterList({ newsletters }: NewsletterListProps) {
  if (!newsletters.length) {
    return <small>No newsletters found.</small>;
  }

  return (
    <ul className="flex flex-col gap-4" data-testid="newsletters-list">
      {newsletters.map((newsletter) => (
        <li
          className="w-[80vw] h-20 cursor-pointer static bg-slate-900 rounded-lg"
          key={newsletter.id}
        >
          <div className="w-[80vw] h-20 p-4 absolute bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-150 hover:-m-2 ease-out hover:ease-in">
            <h3 className="text-lg font-bold">{newsletter.name}</h3>
            <span className="line-clamp-1">{newsletter.content}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
