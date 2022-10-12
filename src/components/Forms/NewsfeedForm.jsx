import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/solid';
import { v4 as uuid } from 'uuid';
import Button from '../Button';
import SelectMenu from '../SelectMenu';
import { useBrands } from '../../api/brands';
import { defaultBrands, validation } from '../../utils';

const initialPromo = {
  brand: defaultBrands[0].value,
  text: '',
  link: '',
  id: '',
  logo: {
    alt: '',
    src: '',
    style: '',
  },
  subtext: '',
  type: 'newsfeed',
  date: '',
};

export default function NewsfeedForm({
  onSubmit,
  promo = initialPromo,
  isLoading,
  isError,
}) {
  const { data: brands } = useBrands();
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      id: '',
      brand: brands[0],
      type: 'newsfeed',
      text: '',
      subtext: '',
      date: '',
      link: '',
    },
  });

  const fields = watch();

  // populate form state with promo data once a response is received
  useEffect(() => {
    if (promo) {
      setValue('id', promo.id);
      setValue(
        'brand',
        brands.find((brand) => brand.value === promo.brand.replace(/\s/g, ''))
      );
      setValue('type', 'newsfeed');
      setValue('text', promo.text);
      setValue('subtext', promo.subtext);
      setValue('date', promo.date);
      setValue('link', promo.link);
      setValue('approved', promo.approved || false);
    }
  }, [brands, promo, setValue]);

  return (
    <div className="my-8 md:grid md:grid-cols-3 md:gap-2">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="promo-brand"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brand
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <Controller
                      name="brand"
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectMenu
                            options={brands}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={false}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Text
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="block w-full flex-1 rounded-md border-gray-300 focus:border-brand focus:ring-brand sm:text-sm"
                      placeholder="Promo text..."
                      {...register('text', { required: 'Text is required' })}
                    />
                  </div>
                  {errors.text && (
                    <span className="mt-1 text-xs font-bold text-red-700">
                      {errors.text?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="block w-full flex-1 rounded-md border-gray-300 focus:border-brand focus:ring-brand sm:text-sm"
                      placeholder="News Feed date..."
                      {...register('date', { required: 'Date is required' })}
                    />
                  </div>
                  {errors.date && (
                    <span className="mt-1 text-xs font-bold text-red-700">
                      {errors.date?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="promo-id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="flex flex-grow items-stretch focus-within:z-10">
                      <input
                        disabled
                        type="text"
                        name="promo-id"
                        id="promo-id"
                        className="block w-full flex-1 rounded-l-md rounded-r-none border-gray-300 bg-gray-100 focus:border-brand focus:ring-brand sm:text-sm"
                        placeholder="Generate a valid promo ID"
                        {...register('id', {
                          validate: () => validation.url.test(fields.link),
                        })}
                      />
                    </div>
                    <button
                      type="button"
                      className="-ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:cursor-not-allowed disabled:text-gray-400"
                      disabled={errors.id?.message.length}
                      onClick={async () => {
                        setValue('id', uuid());
                      }}
                    >
                      <PlusIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Generate</span>
                    </button>
                  </div>
                  {errors.id?.type === 'validate' && (
                    <span className="mt-1 text-xs font-bold text-red-700">
                      Add a valid link
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Link
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <input
                      type="text"
                      name="link"
                      id="link"
                      className="block w-full flex-1 rounded-md border-gray-300 focus:border-brand focus:ring-brand sm:text-sm"
                      placeholder="https://example.com"
                      {...register('link', {
                        required: 'Link is required',
                        pattern: {
                          value:
                            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
                          message: 'Link must be a valid URL',
                        },
                      })}
                    />
                  </div>
                  {errors.link?.message && (
                    <span className="mt-1 text-xs font-bold text-red-700">
                      {errors.link?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <Button
                type="submit"
                className="disabled:cursor-not-allowed"
                variant={!isDirty || !isValid ? 'danger' : 'normal'}
              >
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
                ) : isError ? (
                  'Failed'
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
