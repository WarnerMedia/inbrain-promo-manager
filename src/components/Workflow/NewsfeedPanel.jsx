import { Fragment, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Skeleton from '../Skeleton';
import NewsfeedItem from './NewsfeedItem';

export default function NewsfeedPanel({
  title,
  isLoading,
  show,
  data,
  onUpdate,
  onDelete,
  onApprove,
  onUpdateAllIds,
  onDeployAll,
  onRollback,
}) {
  const [searchValue, setSearchValue] = useState('');

  if (isLoading) {
    return (
      <Fragment>
        {Array.from({ length: 50 }, (_, i) => (
          <Skeleton key={i} />
        ))}
      </Fragment>
    );
  }

  const filteredData =
    data.length > 0
      ? data.filter(
          (item) =>
            item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.text.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.subtext.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];

  return (
    <div className="bg-white shadow sm:rounded-md">
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2 basis-1/5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
              <span className="ml-3 hidden rounded-full bg-brand py-0.5 px-2.5 text-xs font-medium text-white md:inline-block">
                {searchValue.length
                  ? `${filteredData.length} of ${data.length}`
                  : data.length}
              </span>
            </h3>
          </div>
          <div className="mt-2 flex flex-1 items-center">
            <div className="relative h-full w-full text-gray-400 focus-within:text-gray-600">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                aria-hidden="true"
              >
                <SearchIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                name="search-field"
                className="block h-full w-full border-gray-200 py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
                placeholder="Search"
                type="search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            {onUpdateAllIds && (
              <button
                type="button"
                className="relative inline-flex items-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand/70 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                onClick={() => {
                  onUpdateAllIds.mutate(data);
                }}
              >
                Update All IDs
              </button>
            )}
            {onDeployAll && (
              <button
                type="button"
                className="relative inline-flex items-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand/70 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                onClick={() => {
                  onDeployAll.mutate(data);
                }}
              >
                Deploy All
              </button>
            )}
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredData.map((promo) => (
          <NewsfeedItem
            key={promo.id}
            promo={promo}
            show={show}
            isLoading={onUpdate.isLoading}
            isError={onUpdate.isError}
            onUpdate={(promo) => {
              onUpdate.mutate(promo);
            }}
            onDelete={onDelete}
            onApprove={onApprove}
            onRollback={onRollback}
          />
        ))}
      </ul>
    </div>
  );
}
