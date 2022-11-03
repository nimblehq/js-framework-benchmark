import { useRouter } from 'next/router';

import Dropdown from '@components/Dropdown';

import requestManager from '../../lib/request/manager';

type HeaderUserProfileProps = {
  name: string;
};

const logoutMenuItem = (
  logoutHandler: (event: React.SyntheticEvent) => Promise<void>
) => {
  return (
    <form action="auth/sign-out" method="delete" onSubmit={logoutHandler}>
      <button type="submit">Sign out</button>
    </form>
  );
};

const HeaderUserProfile = ({ name, ...rest }: HeaderUserProfileProps) => {
  const router = useRouter();

  const logoutHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    await requestManager('DELETE', 'auth/sign-out');

    router.push('/');
  };

  return (
    <div className="user-profile" {...rest}>
      <div className="user-profile__name">{name}</div>
      <Dropdown items={[logoutMenuItem(logoutHandler)]} />
    </div>
  );
};

export default HeaderUserProfile;
