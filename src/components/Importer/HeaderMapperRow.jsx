import { ArrowRightIcon, CheckIcon, EyeOffIcon } from '@heroicons/react/solid';
import Button from '../Button';
import HeaderMapperSelection from './HeaderMapperSelection';
import MappingStatistics from './MappingStatistics';
import Select from './Select';

export default function HeaderMapperRow({
  options,
  header,
  examples,
  headerMapping,
  setHeaderMapping,
  fieldStatistics,
}) {
  let block = null;
  if (headerMapping.confirmed) {
    block = (
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-1">
          <div className="flex flex-row">
            <div className="flex items-center justify-between">
              <div className="mx-3">{header.slice(0, 30)}</div>
              <div className="px-5" padding="0 20px">
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-1">
              <Select
                value={headerMapping.selectedField}
                options={options}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="mr-3 flex flex-row items-center">
            <CheckIcon className="-my-0.5 mx-3 h-4 w-4" />
            Confirmed
          </div>
          <Button
            onClick={() => {
              setHeaderMapping({
                ...headerMapping,
                confirmed: false,
              });
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    );
  } else if (headerMapping.ignored) {
    block = (
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center">
          <div className="mx-3">{header}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="mr-3 flex flex-row items-center">
            <EyeOffIcon className="-my-0.5 mx-3 h-4 w-4" />
            Ignored
          </div>
          <Button
            onClick={() => {
              setHeaderMapping({
                ...headerMapping,
                selectedField: null,
                ignored: false,
                name: null,
              });
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    );
  } else {
    block = (
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <HeaderMapperSelection
            options={options}
            header={header}
            examples={examples}
            selectedHeader={headerMapping.selectedField}
            setHeader={(selectedField) => {
              setHeaderMapping({
                ...headerMapping,
                selectedField,
                confirmed: false,
                ignored: false,
                name: header,
              });
            }}
          />
        </div>
        <div className="col-span-1">
          <div className="flex h-[90%] flex-col justify-between pt-5 pl-5">
            <div>
              {headerMapping.selectedField && (
                <MappingStatistics
                  selectedField={headerMapping.selectedField}
                  fieldStatistics={fieldStatistics}
                />
              )}
            </div>
            <div>
              {headerMapping.selectedField && (
                <Button
                  variant="success"
                  className="mr-3 mb-2"
                  onClick={() => {
                    setHeaderMapping({
                      ...headerMapping,
                      confirmed: true,
                      ignored: false,
                    });
                  }}
                >
                  Confirm mapping
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => {
                  setHeaderMapping({
                    ...headerMapping,
                    ignored: true,
                    confirmed: false,
                  });
                }}
              >
                Ignore this column
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="my-5">
      <div className="rounded-md border p-3 shadow-md">{block}</div>
    </div>
  );
}
