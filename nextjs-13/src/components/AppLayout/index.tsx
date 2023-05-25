import Header from '../Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div data-testid="appLayout">
      <Header />
      <main className="app-content">{children}</main>
    </div>
  );
};

export default AppLayout;
