import { useState } from 'react';

import Icon from '@components/Icon';

type DropdownProps = {
  items: Array<JSX.Element>;
};

const renderDropdownMenu = (items: Array<JSX.Element>) => {
  return (
    <div className="dropdown__menu" role="navigation">
      {items.map((element, index) => {
        return (
          <div className="dropdown__menu-item" key={`dropdown-${index}`}>
            {element}
          </div>
        );
      })}
    </div>
  );
};

const Dropdown = ({ items }: DropdownProps) => {
  const [showDropdown, toggleDropdown] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="dropdown__toggle"
        onClick={() => toggleDropdown(!showDropdown)}
      >
        <Icon name={'three-dots-vertical'} alt="Open menu" />
      </button>
      {showDropdown && renderDropdownMenu(items)}
    </div>
  );
};

export default Dropdown;
