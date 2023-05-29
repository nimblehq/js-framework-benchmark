interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <main className="prose container h-full m-auto text-center flex justify-center items-center">
      {children}
    </main>
  );
}
