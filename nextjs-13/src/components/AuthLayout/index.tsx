import Card from 'components/Card';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='layout-auth'
      data-testid='layout-auth'
    >
      <main className="app-content">
        <Card>{children}</Card>
      </main>
    </div>
  );
};
