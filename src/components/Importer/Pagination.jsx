import { Fragment } from 'react';
import clsx from 'clsx';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  SelectorIcon,
} from '@heroicons/react/solid';

export default function Pagination({
  pageIndex,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  pageOptions,
  gotoPage,
  pageCount,
  pageSize,
  setPageSize,
}) {
  return (
    <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{pageIndex + 1}</span> of{' '}
            <span className="font-medium">{pageOptions.length}</span>
          </p>
        </div>
        <nav
          className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
        {/* Page size dropdown */}
        <Listbox
          value={pageSize}
          onChange={(value) => {
            setPageSize(value);
          }}
        >
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm">
                <span className="inline-flex w-full truncate">
                  <span className="truncate text-gray-500">
                    {`${pageSize} Items`}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {[10, 20, 30, 40, 50].map((option) => (
                    <Listbox.Option
                      key={option}
                      className={({ active }) =>
                        clsx(
                          active ? 'bg-brand text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex">
                            <span
                              className={clsx(
                                selected ? 'font-semibold' : 'font-normal',
                                'truncate'
                              )}
                            >
                              {option}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-white' : 'text-brand',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
}
