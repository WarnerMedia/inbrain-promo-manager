import Papa from 'papaparse';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useBulkImport } from '../api/promo';
import Complete from '../components/Importer/Complete';
import DataEditor from '../components/Importer/DataEditor';
import HeaderMapper from '../components/Importer/HeaderMapper';
import Steps from '../components/Importer/Steps';
import { Upload } from '../components/Importer/Upload';
import {
  formatData,
  buildSuggestedHeaderMappings,
  buildFinalData,
} from '../components/Importer/utils';
import {
  applyValidation,
  computeStatistics,
  ValidationResult,
} from '../components/Importer/validators';

function useColumns() {
  return useMemo(
    () => [
      {
        Header: 'Brand',
        accessor: 'brand',
        validators: [{ validate: 'required' }],
      },
      {
        Header: 'Type',
        accessor: 'type',
        validators: [{ validate: 'required' }],
      },
      {
        Header: 'Text',
        accessor: 'text',
        validators: [{ validate: 'required' }],
      },
      {
        Header: 'Subtext',
        accessor: 'subtext',
        validators: [{ validate: 'required' }],
      },
      {
        Header: 'Link',
        accessor: 'link',
        validators: [{ validate: 'required' }],
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Image Src',
        accessor: 'imageSrc',
      },
    ],
    []
  );
}

export default function Import() {
  const columns = useColumns();
  const [currentStep, setCurrentStep] = useState(0);
  const [parsed, setParsed] = useState(null);
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({
    statisticsByFieldKey: {},
    total: null,
  });
  const [headerMappings, setHeaderMappings] = useState({});
  const [validationResult, setValidationResult] = useState(
    new ValidationResult()
  );

  const importMutation = useBulkImport();

  const restart = () => {
    setCurrentStep(0);
    setParsed(null);
    setData([]);
    setStatistics({ statisticsByFieldKey: {}, field: null });
    setHeaderMappings({});
    setValidationResult(new ValidationResult());
  };

  const setFile = (file) => {
    Papa.parse(file, {
      complete: (newParsed) => {
        setParsed(newParsed);
        setHeaderMappings(
          buildSuggestedHeaderMappings(columns, newParsed.data[0])
        );
        setCurrentStep(1);
      },
    });
  };

  useEffect(() => {
    if (importMutation.isSuccess) {
      setCurrentStep(3);
    }
  }, [importMutation.isSuccess]);

  useEffect(() => {
    if (parsed && parsed.data) {
      const newFormattedData = formatData(headerMappings, parsed.data);
      setData(newFormattedData);
    }
  }, [headerMappings, parsed]);

  useEffect(() => {
    if (data.length > 0) {
      const newValidationResult = applyValidation(data, columns);
      setValidationResult(newValidationResult);
      const newStatistics = computeStatistics(
        data,
        headerMappings,
        newValidationResult
      );
      setStatistics(newStatistics);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, headerMappings]);

  const rowData = [];
  for (let i = 0; i < 100; i++) {
    rowData.push({ rowIndex: i });
  }

  const usedFilters = Object.keys(headerMappings)
    .map((h) => headerMappings[h])
    .filter((h) => !h.ignored && h.selectedField)
    .map((h) => h.selectedField.accessor);

  const unselectedFields = columns.filter((filter) => {
    return usedFilters.indexOf(filter.accessor) < 0;
  });

  const headers = Object.keys(headerMappings)
    .map((h) => headerMappings[h])
    .filter((h) => h.confirmed)
    .map((h) => h.selectedField.accessor);

  const selectedFields = columns.filter((f) => headers.includes(f.accessor));

  const missingRequiredFields = columns.filter(
    (f) => !selectedFields.map((f) => f.accessor).includes(f.accessor)
  );

  // const finalSelectedFields = columns.filter(
  //   (f) => headers.includes(f.accessor) || fieldIsRequired(f)
  // );

  // this ref is used to prevent table reset when a user edits
  const skipResetRef = useRef(false);

  // when our cell renderer calls updateData, we'll use the
  // rowIndex, columnId, and new value to update the original data
  const updateData = (rowIndex, columnId, value) => {
    // turn on the flag to not reset the page
    skipResetRef.current = true;
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // after the data changes, we turn the flag back off
  // so that if the data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    skipResetRef.current = false;
  }, [data]);

  return (
    <div className="my-8 w-full">
      <Steps
        steps={['Upload', 'Match', 'Review', 'Complete']}
        currentStep={currentStep}
      />
      {currentStep === 0 && (
        <div>
          <Upload accept="text/csv" setFile={setFile} />
        </div>
      )}
      {currentStep === 1 && (
        <HeaderMapper
          parsed={parsed}
          statistics={statistics}
          formattedData={data.length > 0 ? data : rowData}
          fields={unselectedFields}
          headerMappings={headerMappings}
          missingRequiredFields={missingRequiredFields}
          setHeaderMappings={setHeaderMappings}
          restart={restart}
          onComplete={() => {
            setCurrentStep(2);
          }}
        />
      )}
      {currentStep === 2 && (
        <DataEditor
          data={data}
          columns={columns}
          headerMappings={headerMappings}
          validationResult={validationResult}
          skipReset={skipResetRef.current}
          updateData={updateData}
          onBack={() => {
            setCurrentStep(1);
          }}
          isLoading={importMutation.isLoading}
          onSubmit={() => {
            const finalData = buildFinalData(data, validationResult);
            importMutation.mutate(finalData);
          }}
        />
      )}
      {importMutation.isSuccess && currentStep === 3 && (
        <Complete items={buildFinalData(data, validationResult)} />
      )}
    </div>
  );
}
