import { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  RewindIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import NewsfeedForm from '../Forms/NewsfeedForm';
import Modal from '../Modal';

export default function NewsfeedItem({
  promo,
  show,
  isLoading,
  isError,
  onUpdate,
  onDelete,
  onApprove,
  onRollback,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Transition
      show={show}
      enter="transition duration-75 ease-in"
      enterFrom="transform scale-y-95 opacity-0"
      enterTo="transform scale-y-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-y-100 opacity-100"
      leaveTo="transform scale-y-95 opacity-0"
    >
      <Disclosure as="li">
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className={clsx(
                'block hover:bg-gray-50',
                open ? 'border-b border-gray-200 shadow-md' : ''
              )}
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div className="mr-4">
                      <Menu.Button className="group inline-flex w-full justify-center rounded-full p-2 text-sm font-medium text-white hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <DotsVerticalIcon
                          className="h-5 w-5 text-gray-500 group-hover:text-gray-900"
                          aria-hidden="true"
                        />
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
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={clsx(
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  active
                                    ? 'bg-brand text-white'
                                    : 'text-gray-900'
                                )}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  onApprove.mutate({
                                    ...promo,
                                    approved: !promo.approved,
                                  });
                                }}
                              >
                                <CheckCircleIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                {promo.approved ? 'Unapprove' : 'Approve'}
                              </button>
                            )}
                          </Menu.Item>
                          {onRollback && (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={clsx(
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    active
                                      ? 'bg-brand text-white'
                                      : 'text-gray-900'
                                  )}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onRollback.mutate({
                                      ...promo,
                                      approved: false,
                                    });
                                  }}
                                >
                                  <RewindIcon
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  Rollback
                                </button>
                              )}
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={clsx(
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  active
                                    ? 'bg-brand text-white'
                                    : 'text-gray-900'
                                )}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowModal(true);
                                }}
                              >
                                <TrashIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Modal
                    show={showModal}
                    onConfirm={() => {
                      onDelete.mutate(promo.id);
                      setShowModal(false);
                    }}
                    onCancel={() => {
                      setShowModal(false);
                    }}
                  />
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-gray-800">
                        {promo.text}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="truncate">{promo.subtext}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">{promo.brand}</p>
                        <p className="mt-2 truncate text-sm italic text-gray-500">
                          {promo.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronUpIcon
                  className={clsx(
                    'h-5 w-5 text-gray-700 transition-transform duration-100',
                    {
                      'rotate-180 transform': !open,
                    }
                  )}
                />
              </div>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-75 ease-in"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel static>
                {({ close }) => (
                  <NewsfeedForm
                    promo={promo}
                    onSubmit={(promo) => {
                      close();
                      onUpdate(promo);
                    }}
                    isLoading={isLoading}
                    isError={isError}
                  />
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </Transition>
  );
}
