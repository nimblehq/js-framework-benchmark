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
      <button className="dropdown__toggle" onClick={() => toggleDropdown(!showDropdown)}>
        <img src="images/icons/three-dots-vertical.svg" alt="Open menu" />
      </button>
      {showDropdown && renderDropdownMenu(items)}
    </div>
  );
};

export default Dropdown;
