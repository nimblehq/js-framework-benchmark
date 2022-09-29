import Header from '../Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="layout-default">
      <Header />
      <main className="app-content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
