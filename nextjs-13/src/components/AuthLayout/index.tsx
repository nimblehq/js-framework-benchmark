import Card from 'components/Card';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='layout-auth'
    >
      <main className="app-content">
        <Card>{children}</Card>
      </main>
    </div>
  );
};