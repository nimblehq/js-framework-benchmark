import Card from 'components/Card';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className={'layout-auth'}
      data-testid="authLayout"
    >
      <main className="app-content">
        <Card>{children}</Card>
      </main>
    </div>
  );
};

export default AuthLayout;
