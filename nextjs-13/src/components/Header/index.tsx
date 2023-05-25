import Link from 'next/link';

import { useUser } from '../../context/user.context';
import HeaderUserProfile from './UserProfile';

const Header = ({ ...rest }) => {
  const { user } = useUser();

  return (
    <header className="app-header" data-testid="appHeader" {...rest}>
      <nav className="app-header__navigation">
        <Link href="home">
          NextNewsletter 🚀
        </Link>
        {user && <HeaderUserProfile name={user.name} />}
      </nav>
    </header>
  );
};

export default Header;
