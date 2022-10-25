import { useState } from 'react';

import Dropdown from '../Dropdown';

type HeaderUserProfileProps = {
  name: string;
};

const logoutMenuItem = () => {
  return (
    <form action="/api/auth/sgn-out" method="delete">
      <button type="submit">Logout</button>
    </form>
  );
}

const HeaderUserProfile = ({ name, ...rest }: HeaderUserProfileProps) => {
  const [showDropdown, toggleDropdown] = useState(false);

  return (
    <div className="user-profile" {...rest}>
      <div className="user-profile__name">{name}</div>
      <Dropdown items={[logoutMenuItem()]} />
    </div>
  );
};

export default HeaderUserProfile;
