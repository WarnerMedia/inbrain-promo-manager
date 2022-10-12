import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function SelectMenu({ options, value, onChange, disabled }) {
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative mt-1 w-full">
        <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand sm:text-sm">
          <span className="block truncate">{value.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.name}
                className={({ active, selected }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                    active ? 'bg-gray-100' : 'text-gray-900',
                    selected ? 'bg-brand bg-opacity-25' : ''
                  )
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={clsx(
                        'block truncate',
                        selected ? 'font-bold' : 'font-normal'
                      )}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span
                        className={clsx(
                          'absolute inset-y-0 left-0 flex items-center pl-3',
                          active ? 'text-gray-600' : 'text-gray-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
