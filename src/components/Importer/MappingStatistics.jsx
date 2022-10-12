import {
  CheckIcon,
  ExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid';

const percentage = (a, b) => Math.round((a / b) * 100 * 10) / 10;

export default function MappingStatistics({ fieldStatistics, selectedField }) {
  const total = fieldStatistics.total;
  const counts = fieldStatistics.statistics?.counts;
  const errorTypeCounts = fieldStatistics.statistics?.errorTypeCounts;

  if (!counts || !errorTypeCounts) {
    return <div></div>;
  }

  return (
    <div>
      {selectedField && (
        <div>
          Matched to <b>{selectedField.Header}</b>
        </div>
      )}
      {!selectedField && <div>No match detected</div>}
      <br />
      <div>
        <InformationCircleIcon className="mr-3 h-4 w-4 text-gray-500" />
        <b>{percentage(total - counts.isNull, total)}%</b> of your rows have a
        value for this column
      </div>
      {errorTypeCounts.total === 0 && (
        <div>
          <CheckIcon className="mr-3 h-4 w-4 text-green-700" />
          All rows pass validation for this column.
        </div>
      )}
      {errorTypeCounts.total > 0 && (
        <div>
          <ExclamationIcon className="mr-3 h-4 w-4 text-yellow-500" />
          {errorTypeCounts.total / total < 0.02 && (
            <span>
              <b>{errorTypeCounts.total}</b> rows fail validation (repair on
              next step)
            </span>
          )}
          {errorTypeCounts.total / total >= 0.02 && (
            <span>
              <b>{percentage(errorTypeCounts.total, total)}%</b> of rows fail
              validation (repair on next step)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
