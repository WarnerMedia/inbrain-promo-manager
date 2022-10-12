import { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

const defaultActions = [
  { name: 'Save', onClick: () => {} },
  { name: 'Approve', onClick: () => {} },
  { name: 'Save & Approve', onClick: () => {} },
];

export default function MenuButton({ actions }) {
  const [activeAction, setActiveAction] = useState(defaultActions[0]);

  return !actions ? (
    <button
      type="submit"
      className="inline-flex justify-center rounded-md border border-transparent bg-brand py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
    >
      Save
    </button>
  ) : (
    <span className="relative z-10 inline-flex rounded-md shadow-sm">
      <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
        {activeAction.name}
      </button>
      <Menu as="span" className="relative -ml-px block">
        <Menu.Button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
          <Menu.Items className="absolute right-0 mt-2 -mr-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {actions.map((action) => (
                <Menu.Item key={action.name}>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'flex w-full items-center justify-start px-4 py-2 text-sm'
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveAction(action);
                      }}
                    >
                      {action.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </span>
  );
}
