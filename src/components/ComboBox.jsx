import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { usePromos } from '../api/promo';

export default function ComboBox({ value, onChange, disabled }) {
  const [promoId, setPromoId] = useState('');
  const [query, setQuery] = useState('');
  const { data, isFetching } = usePromos();

  function handleChange(promo) {
    setPromoId(promo);
    onChange(promo.id);
  }

  const filteredPromos =
    query === '' && isFetching
      ? data
      : data.filter((promo) => {
          return promo.id.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (value && !isFetching) {
      const promo = data.find((promo) => value === promo.id);
      setPromoId(promo);
    }
  }, [value, data, isFetching]);

  return (
    <Combobox
      as="div"
      value={promoId}
      onChange={handleChange}
      disabled={disabled}
    >
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(promo) => promo.id}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {!isFetching &&
            filteredPromos.map((promo) => (
              <Combobox.Option
                key={promo.id}
                value={promo}
                className={({ active }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-brand text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={clsx(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {promo.id}
                    </span>
                    {selected && (
                      <span
                        className={clsx(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-brand'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
