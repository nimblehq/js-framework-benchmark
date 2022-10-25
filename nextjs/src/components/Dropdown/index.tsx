import { useState } from "react";
import { nanoid } from 'nanoid';

type DropdownProps = {
  items: Array<JSX.Element>
};

const renderDropdownMenu = (items: Array<JSX.Element>) => {
  return (
    <div className="dropdown__menu" role="navigation">
      {items.map(element => {
          return (
            <div className="dropdown__menu-item" key={nanoid()}>
              {element}
            </div>
          )
        })
      }
    </div>
  );
};

const Dropdown = ({ items }: DropdownProps) => {
  const [showDropdown, toggleDropdown] = useState(false);

  return (
    <div className="dropdown">
      <button className="user-profile__toggle" onClick={() => toggleDropdown(!showDropdown)}>
        open
      </button>
      {showDropdown && renderDropdownMenu(items)}
    </div>
  );
};

export default Dropdown;
