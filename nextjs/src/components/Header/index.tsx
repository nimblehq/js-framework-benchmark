import Link from 'next/link';

import { useUser } from 'context/user.context';

type HeaderUserProps = {
  name: string;
};

const HeaderUserProfile = ({ name }: HeaderUserProps) => {
  return (
    <div className="user-profile">
      {name}
    </div>
  )
}

const Header = () => {
  const { user } = useUser();

  return (
    <header className="app-header">
      <nav className="app-header__navigation">
        <Link href="/" passHref>
          <a href="home" className="app-header__brand">
            NextNewsletter 🚀
          </a>
        </Link>
        {user && <HeaderUserProfile name={user.name} />}
      </nav>
    </header>
  );
};

export default Header;
