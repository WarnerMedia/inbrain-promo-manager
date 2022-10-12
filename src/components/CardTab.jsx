import clsx from 'clsx';
import { Tab } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';

export default function CardTab({ title, description }) {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          selected ? 'border-transparent ring-2 ring-brand' : 'border-gray-300',
          'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
        )
      }
    >
      {({ selected }) => (
        <>
          <div className="flex flex-1">
            <div className="flex flex-col items-start">
              <span className="block text-sm font-medium text-gray-900">
                {title}
              </span>
              <span className="mt-1 flex items-center text-left text-sm text-gray-500">
                {description}
              </span>
            </div>
          </div>
          <CheckCircleIcon
            className={clsx(!selected ? 'hidden' : 'h-5 w-5 text-brand')}
            aria-hidden="true"
          />
          <div
            className={clsx(
              selected ? 'border border-brand' : '',
              'pointer-events-none absolute -inset-px rounded-lg'
            )}
            aria-hidden="true"
          />
        </>
      )}
    </Tab>
  );
}
