interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main
      data-testid="auth-layout"
      className="prose container h-full m-auto text-center flex justify-center items-center"
    >
      {children}
    </main>
  );
}
