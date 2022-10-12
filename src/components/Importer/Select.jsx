import { Fragment } from 'react';
import clsx from 'clsx';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

export default function Select({ value, options, onChange, disabled = false }) {
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className="relative">
          <div className="inline-flex divide-x divide-white rounded-md shadow-sm">
            <div className="relative z-0 inline-flex divide-x divide-white rounded-md shadow-sm">
              <div className="relative inline-flex items-center rounded-l-md border border-transparent bg-brand py-2 pl-3 pr-4 text-white shadow-sm">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                <p className="ml-2.5 text-sm font-medium">{value.Header}</p>
              </div>
              <Listbox.Button className="relative inline-flex items-center rounded-l-none rounded-r-md bg-brand p-2 text-sm font-medium text-white hover:bg-brand focus:z-10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50">
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </Listbox.Button>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.accessor}
                  className={({ active }) =>
                    clsx(
                      active ? 'bg-brand text-white' : 'text-gray-900',
                      'relative cursor-default select-none p-4 text-sm'
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <p
                          className={selected ? 'font-semibold' : 'font-normal'}
                        >
                          {option.Header}
                        </p>
                        {selected ? (
                          <span
                            className={active ? 'text-white' : 'text-brand'}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
