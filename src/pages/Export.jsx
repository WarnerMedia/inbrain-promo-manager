/* eslint-disable react/jsx-key */
import { useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { useExportData } from 'react-table-plugins';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';
import Papa from 'papaparse';
import { usePromos, useStagePromos } from '../api/promo';
import Pagination from '../components/Importer/Pagination';
import CardTab from '../components/CardTab';

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === 'csv') {
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });

    return new Blob([csvString], { type: 'text/csv' });
  } else if (fileType === 'xlsx') {
    const header = columns.map((c) => c.exportValue);
    const compatibleData = data.map((row) => {
      const obj = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header,
    });
    XLSX.utils.book_append_sheet(wb, ws1, 'React Table Data');
    XLSX.writeFile(wb, `${fileName}.xlsx`);

    // Returning false as downloading of file is already taken care of
    return false;
  }

  return false;
}

function StageTable() {
  const { data, isLoading } = useStagePromos();

  return isLoading ? <p>Loading...</p> : <TableInstance tableData={data} />;
}

function LiveTable() {
  const { data, isLoading } = usePromos();

  return isLoading ? <p>Loading...</p> : <TableInstance tableData={data} />;
}

function TableInstance({ tableData }) {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Brand',
        accessor: 'brand',
      },
      {
        Header: 'Link',
        accessor: 'link',
      },
      {
        Header: 'Subtext',
        accessor: 'subtext',
      },
      {
        Header: 'Text',
        accessor: 'text',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Image Src',
        accessor: (row) => row.image?.src,
      },
      {
        Header: 'Image Alt',
        accessor: (row) => row.image?.alt,
      },
      {
        Header: 'Logo Src',
        accessor: (row) => row.logo?.src,
      },
      {
        Header: 'Logo Alt',
        accessor: (row) => row.logo?.alt,
      },
      {
        Header: 'Logo Style',
        accessor: (row) => row.logo?.style,
      },
    ];

    return [columns, tableData];
  }, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      getExportFileBlob,
      disableMultiSort: true,
    },
    useResizeColumns,
    useFlexLayout,
    useSortBy,
    usePagination,
    useExportData
  );

  return <Table {...tableInstance} />;
}

function Table({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageOptions,
  pageCount,
  gotoPage,
  setPageSize,
  exportData,
  state: { pageIndex, pageSize },
}) {
  return (
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
                          className="truncate px-2 py-4 text-sm font-medium"
                        >
                          {cell.render('Cell')}
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
      <div className="flex flex-1 justify-between px-4 py-2">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            exportData('csv', true);
          }}
        >
          Export CSV
        </button>
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            exportData('xlsx', true);
          }}
        >
          Export XLSX
        </button>
      </div>
    </div>
  );
}

export default function Export() {
  return (
    <div className="my-8 w-full">
      <Tab.Group>
        <Tab.List className="my-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <CardTab
            title="Staged Promos"
            description="Export all promos that require approval"
          />
          <CardTab
            title="Live Promos"
            description="Export all promos served to users"
          />
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <StageTable />
          </Tab.Panel>
          <Tab.Panel>
            <LiveTable />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
