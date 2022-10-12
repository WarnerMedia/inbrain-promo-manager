/* eslint-disable react/jsx-key */
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid';
import { Switch } from '@headlessui/react';
import EditableCell from './EditableCell';
import Pagination from './Pagination';
import Button from '../Button';
import { buildFinalData, filterEmptyRows } from './utils';

function filterEmpty(rows, columnIds) {
  // return only rows with blank data for any column
  return rows.filter((row) => columnIds.some((id) => !row.values[id]));
}
// let the table remove the filter if the value is empty
filterEmpty.autoRemove = (val) => !val;

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [enabled, setEnabled] = useState(globalFilter);

  return (
    <Switch.Group as="div" className="mb-3 flex items-center">
      <Switch
        checked={enabled}
        onChange={(val) => {
          setEnabled(val);
          setGlobalFilter(val);
        }}
        className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-full w-full rounded-md bg-white"
        />
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'bg-brand' : 'bg-gray-200',
            'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
          )}
        />
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">
          Filter invalid rows
        </span>
      </Switch.Label>
    </Switch.Group>
  );
}

export default function DataEditor({
  columns,
  data,
  skipReset,
  updateData,
  isLoading,
  onBack,
  onSubmit,
  validationResult,
}) {
  const defaultColumn = useMemo(
    () => ({
      Cell: EditableCell,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageCount,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
    pageOptions,
    gotoPage,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      globalFilter: filterEmpty,
      // updateData isn't part of the API, but anything we pass into these options
      // will be available on our table instance. That way we can call this
      // function from our cell renderer!
      updateData,
      // prevent the page from changing when we edit cell data
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useResizeColumns,
    useFlexLayout,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const shouldShowSubmit = () => filterEmptyRows(data).length > 0;

  return (
    <>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="flex flex-col rounded-lg shadow-md">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block max-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-auto rounded-t-lg">
              <table
                {...getTableProps()}
                className="max-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-100">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="relative text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          <span
                            {...column.getSortByToggleProps()}
                            className="inline-flex w-full items-center justify-between px-3 py-2"
                          >
                            {column.render('Header')}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ArrowSmDownIcon className="h-4 w-4" />
                              ) : (
                                <ArrowSmUpIcon className="h-4 w-4" />
                              )
                            ) : (
                              <SwitchVerticalIcon className="h-4 w-4" />
                            )}
                          </span>
                          {column.canResize && (
                            <div
                              {...column.getResizerProps()}
                              className="absolute right-0 top-0 z-10 h-full w-0.5 touch-none bg-gray-400"
                            />
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="divide-y divide-gray-200 overflow-scroll bg-white"
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="text-sm font-medium"
                          >
                            {cell.render('Cell', { editable: true })}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          pageIndex={pageIndex}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          pageCount={pageCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
      <div className="mt-4 flex flex-1 items-center justify-between">
        {onBack && <Button onClick={onBack}>Back</Button>}
        {shouldShowSubmit() && (
          <Button onClick={onSubmit}>
            {isLoading ? (
              <>
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {'Importing...'}
              </>
            ) : validationResult.hasErrors() ? (
              `Upload Valid Rows (${
                buildFinalData(data, validationResult).length
              })`
            ) : (
              'Upload'
            )}
          </Button>
        )}
      </div>
    </>
  );
}
