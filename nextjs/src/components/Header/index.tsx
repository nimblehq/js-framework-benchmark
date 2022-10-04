import Link from 'next/link';

import { useUser } from '../../context/user.context';
import HeaderUserProfile from './UserProfile';

const Header = ({ ...rest }) => {
  const { user } = useUser();

  return (
    <header className="app-header" {...rest}>
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
