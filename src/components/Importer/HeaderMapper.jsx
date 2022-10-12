import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Button from '../Button';
import HeaderMapperRow from './HeaderMapperRow';

export default function HeaderMapper({
  parsed,
  fields,
  statistics,
  headerMappings,
  setHeaderMappings,
  missingRequiredFields,
  onComplete,
  restart,
}) {
  const data = parsed.data;
  const options = fields.map(({ Header, accessor }) => ({
    Header,
    accessor,
  }));

  const hasMissingRequiredFields = missingRequiredFields.length > 0;

  return (
    <div>
      <div>
        <h5>{parsed.data.length - 1} Rows Imported</h5>
      </div>
      {data[0].map((header, columnIndex) => {
        const examples = data.slice(1, 4).map((d) => d[columnIndex]);
        const headerMapping = headerMappings[columnIndex] || {};
        const fieldStatistics = {
          total: statistics.total,
          statistics:
            statistics.statisticsByFieldKey[
              headerMapping.selectedField?.accessor
            ],
        };
        return (
          <HeaderMapperRow
            key={columnIndex}
            columnIndex={columnIndex}
            header={header}
            examples={examples}
            headerMapping={headerMapping}
            setHeaderMapping={(headerMapping) => {
              let newMappings = { ...headerMappings };
              headerMapping.columnIndex = columnIndex;
              newMappings[columnIndex] = headerMapping;
              setHeaderMappings(newMappings);
            }}
            options={options}
            fieldStatistics={fieldStatistics}
          />
        );
      })}
      <div className="my-5">
        <div className="text-right">
          {hasMissingRequiredFields &&
            missingRequiredFields.map((f) => {
              return (
                <div key={f.accessor}>
                  <div className="mb-4 font-bold text-red-700">
                    Missing mapping for {f.Header}
                    <ExclamationCircleIcon className="h-4 w-4 text-red-700" />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={restart}>Back</Button>
          <Button
            onClick={onComplete}
            variant={hasMissingRequiredFields ? 'danger' : 'normal'}
          >
            {hasMissingRequiredFields && 'Proceed'}
            {!hasMissingRequiredFields && 'Review'}
          </Button>
        </div>
      </div>
    </div>
  );
}
