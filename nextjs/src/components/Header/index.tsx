import Link from 'next/link';

const Header = () => {
  return (
    <header className="app-header">
      <nav className="app-header__navigation">
        <Link href="/" passHref>
          <a href="home" className="app-header__brand">
            NextNewsletter 🚀
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
