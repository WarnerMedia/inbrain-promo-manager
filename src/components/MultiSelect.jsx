import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, XCircleIcon } from '@heroicons/react/solid';

export default function MultiSelect({ value, options, onChange, disabled }) {
  const [selectedItems, setSelectedItems] = useState([]);

  function isSelected(value) {
    return selectedItems.some((el) => el === value);
  }

  function handleItem(item) {
    const selectedResult = selectedItems.filter(
      (selected) => selected === item
    );

    if (selectedResult.length) {
      removeItem(item);
    } else {
      setSelectedItems(item);
      onChange(item);
    }
  }

  function removeItem(item) {
    const removedSelection = selectedItems.filter(
      (selected) => selected !== item
    );
    setSelectedItems(removedSelection);
    onChange(removedSelection);
  }

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  return (
    <Listbox value={value} onChange={handleItem} disabled={disabled} multiple>
      <div className="relative mt-1 w-full">
        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm transition duration-150 ease-in-out focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm">
          {!selectedItems.length && 'Select one or more options'}
          {selectedItems.map((item) => (
            <div
              key={item}
              className="mr-1 mt-1 inline-flex items-center rounded bg-brand p-1 text-white"
            >
              {item}
              <XCircleIcon
                className="ml-1 h-5 w-5 cursor-pointer"
                onClick={() => removeItem(item)}
              />
            </div>
          ))}
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
            {options.map((option) => {
              const selected = isSelected(option);
              return (
                <Listbox.Option key={option} value={option}>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? 'bg-brand text-white' : 'text-gray-900'
                      } relative cursor-default select-none py-2 pl-8 pr-4`}
                    >
                      <span
                        className={`${
                          selected ? 'font-semibold' : 'font-normal'
                        } block truncate`}
                      >
                        {option}
                      </span>
                      {selected && (
                        <span
                          className={`${
                            active ? 'text-white' : 'text-brand'
                          } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                        >
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
