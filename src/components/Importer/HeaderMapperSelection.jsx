import { ArrowRightIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import Select from './Select';

export default function HeaderMapperSelection({
  header,
  examples,
  setHeader,
  selectedHeader,
  options,
}) {
  return (
    <div>
      <div className="mr-5 mb-5">
        <div className="flex flex-row">
          <div className="flex items-center justify-between">
            <div className="mx-3">{header.slice(0, 30)}</div>
            <div className="px-5">
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="flex flex-none">
            <Select
              value={selectedHeader || options[0]}
              options={options}
              onChange={setHeader}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 border border-gray-300">
        {examples.map((e, idx) => (
          <Fragment key={idx}>
            <div className="col-span-1 flex items-center justify-center bg-gray-200 px-3 py-5">
              {idx}
            </div>
            <div className="col-span-11 truncate whitespace-nowrap px-3 py-5">
              {e || <i>No Data</i>}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
