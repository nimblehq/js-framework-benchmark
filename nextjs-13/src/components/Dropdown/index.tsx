import { useState } from 'react';

import Image from 'next/image';
import { signOut } from 'next-auth/react';

const Dropdown = () => {
  const [showDropdown, toggleDropdown] = useState(false);

  return (
    <div className="dropdown" data-testid="dropdown">
      <button
        className="dropdown__toggle"
        onClick={() => toggleDropdown(!showDropdown)}
        title="Open menu"
        data-testid="dropdown-toggle"
      >
        <Image
          src={`/images/icons/three-dots-vertical.svg`}
          alt={'Log out button'}
          width={16}
          height={16}
        />
      </button>
      {showDropdown && (
        <div
          className="dropdown__menu"
          role="navigation"
          data-testid="dropdown-menu"
        >
          <div className="dropdown__menu-item">
            <button
              onClick={signOut}
              type="submit"
              data-testid="signout-button"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
