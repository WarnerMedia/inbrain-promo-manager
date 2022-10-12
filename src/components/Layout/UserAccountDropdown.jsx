import { Fragment } from 'react';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function UserAccountDropdown({ setHelpOpen }) {
  const { signOut, user } = useAuthenticator();

  return (
    <Menu as="div" className="relative mt-1 inline-block w-full px-3 text-left">
      <div>
        <Menu.Button className="group w-full rounded-md border px-3.5 py-2 text-left text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="flex w-full items-center justify-between">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm text-gray-500">
                  {user.attributes.email.split('@')[0]}
                </span>
              </span>
            </span>
            <SelectorIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  role="button"
                  tabIndex="-1"
                  className={clsx(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                  onClick={() => setHelpOpen(true)}
                >
                  Help
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  role="button"
                  tabIndex="-1"
                  className={clsx(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                  onClick={signOut}
                >
                  Logout
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
