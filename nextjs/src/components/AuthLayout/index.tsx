interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="layout-auth">
      <main className="app-content">{children}</main>
    </div>
  );
};

export default AuthLayout;
