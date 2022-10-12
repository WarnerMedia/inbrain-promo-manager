import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';

export default function PageTitle({ title }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          {title}
        </h1>
      </div>
      <div className="flex sm:mt-0 sm:ml-4">
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2">
              <PlusCircleIcon
                className="h-6 w-6 text-brand"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={clsx(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                    to="/promo/new"
                  >
                    Create Promo
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={clsx(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                    to="/newsfeed/new"
                  >
                    Create Newsfeed
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/campaign/new"
                    className={clsx(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    Create Campaign
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
