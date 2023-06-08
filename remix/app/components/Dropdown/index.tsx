import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Form } from '@remix-run/react';

export default function Dropdown() {
  return (
    <Menu
      as="div"
      className="relative inline-block items-center"
      data-testid="dropdown"
    >
      <Menu.Button
        className="p-0.5 flex w-full justify-center rounded-full hover:bg-gray-300"
        data-testid="dropdown-toggle"
      >
        <EllipsisVerticalIcon className="h-6 w-6" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 origin-top-right z-10 mt-2 w-40 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          data-testid="dropdown-menu"
        >
          <div className="py-1">
            <Menu.Item data-testid="dropdown-item">
              <Form method="POST" action="/auth/sign-out">
                <button
                  type="submit"
                  className={
                    'block w-full px-4 py-2 text-left text-sm hover:bg-gray-300'
                  }
                >
                  Sign out
                </button>
              </Form>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
