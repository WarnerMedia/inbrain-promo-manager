import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/solid';
import Button from '../Button';
import ComboBox from '../ComboBox';
import MultiSelect from '../MultiSelect';
import { getCampaignId } from '../../api/campaign';
import { usePageConfigs } from '../../api/configs';
import { defaultBrands } from '../../utils';

const initialCampaign = {
  brand: defaultBrands[0].value,
  name: '',
  promoId: '',
  id: '',
  slotIndex: '',
  type: 'campaign',
  pageConfigs: [],
  approved: false,
};

const segments = [
  '1111',
  '1112',
  '1113',
  '1114',
  '1115',
  '1116',
  '1117',
  '1118',
  '1119',
  '111a',
  '111b',
  '111c',
  '111d',
  '111e',
  '111f',
  '111g',
  '111h',
  '111i',
  '111k',
  '111l',
  '111m',
  '111n',
  '111o',
  '111p',
  '111q',
  '111r',
  '111s',
  '111t',
  '111u',
  '111v',
  '111w',
  '111x',
  '111y',
  'BDM1',
  'CNP2',
  'CNST',
  'CTEE',
  'CTRE',
  'MXNV',
  'MXPV',
  'WBGL',
  'WBGM',
];

export default function CampaignForm({
  onSubmit,
  campaign = initialCampaign,
  isLoading,
  isError,
}) {
  const { data: configs } = usePageConfigs();

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
      promoId: '',
      name: '',
      slotIndex: '',
      type: 'campaign',
      pageConfigs: configs.map((config) => config.page),
      segments: [],
    },
  });

  const fields = watch();

  // populate form state with promo data once a response is received
  useEffect(() => {
    if (campaign) {
      setValue('id', campaign.id);
      setValue('promoId', campaign.promoId);
      setValue('name', campaign.name);
      setValue('slotIndex', campaign.slotIndex);
      setValue('pageConfigs', campaign.pageConfigs);
      setValue('segments', campaign.segments);
      setValue('approved', campaign.approved || false);
    }
  }, [campaign, setValue]);

  return (
    <div className="my-8 md:grid md:grid-cols-3 md:gap-2">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full flex-1 rounded-md border-gray-300 focus:border-brand focus:ring-brand sm:text-sm"
                      placeholder="Name text..."
                      {...register('name', { required: 'Name is required' })}
                    />
                  </div>
                  {errors.text && (
                    <span className="mt-1 text-xs font-bold text-red-700">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="promoId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Promo ID
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <Controller
                      name="promoId"
                      control={control}
                      render={({ field }) => {
                        return (
                          <ComboBox
                            value={field.value}
                            onChange={field.onChange}
                            disabled={false}
                          />
                        );
                      }}
                    />
                  </div>
                  {errors.promoId && (
                    <span className="mt-1 text-xs font-bold text-red-700">
                      {errors.promoId?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="pageConfigs"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Page Configs
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <Controller
                      name="pageConfigs"
                      control={control}
                      render={({ field }) => {
                        return (
                          <MultiSelect
                            options={configs.map(({ page }) => page)}
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
                    htmlFor="campaign-id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Campaign ID
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="flex flex-grow items-stretch focus-within:z-10">
                      <input
                        disabled
                        type="text"
                        name="id"
                        id="id"
                        className="block w-full flex-1 rounded-l-md rounded-r-none border-gray-300 bg-gray-100 focus:border-brand focus:ring-brand sm:text-sm"
                        placeholder="Generate a valid campaign ID"
                        {...register('id', {})}
                      />
                    </div>
                    <button
                      type="button"
                      className="-ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:cursor-not-allowed disabled:text-gray-400"
                      disabled={errors.id?.message.length}
                      onClick={async () => {
                        const id = await getCampaignId(fields);
                        setValue('id', id);
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
                      Add a valid slot index
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="slotIndex"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Slot Index
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <input
                      type="text"
                      name="slotIndex"
                      id="slotIndex"
                      className="block w-full flex-1 rounded-md border-gray-300 focus:border-brand focus:ring-brand sm:text-sm"
                      {...register('slotIndex', {
                        required: 'Slot index is required',
                      })}
                    />
                  </div>
                  {errors.slotIndex?.message && (
                    <span className="mt-1 text-xs font-bold text-red-700">
                      {errors.slotIndex?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="segments"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Segments
                  </label>
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <Controller
                      name="segments"
                      control={control}
                      render={({ field }) => {
                        return (
                          <MultiSelect
                            options={segments}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={false}
                          />
                        );
                      }}
                    />
                  </div>
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
