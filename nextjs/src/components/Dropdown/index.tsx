import { useState } from 'react';

import Icon from '@components/Icon';

type DropdownProps = {
  items: Array<JSX.Element>;
};

const renderDropdownMenu = (items: Array<JSX.Element>) => {
  return (
    <div
      className="dropdown__menu"
      role="navigation"
      data-testid="dropdown-menu"
    >
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

const Dropdown = ({ items, ...rest }: DropdownProps) => {
  const [showDropdown, toggleDropdown] = useState(false);

  return (
    <div className="dropdown" data-testid="dropdown" {...rest}>
      <button
        className="dropdown__toggle"
        onClick={() => toggleDropdown(!showDropdown)}
        title="Open menu"
        data-testid="dropdown-toggle"
      >
        <Icon name={'three-dots-vertical'} alt="Open menu" />
      </button>
      {showDropdown && renderDropdownMenu(items)}
    </div>
  );
};

export default Dropdown;
