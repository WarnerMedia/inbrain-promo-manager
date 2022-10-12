import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUploadIcon } from '@heroicons/react/outline';

export function Upload({ accept, setFile }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  return (
    <>
      <div
        {...getRootProps()}
        className="group relative block w-full cursor-pointer rounded-lg border-2 border-dashed p-12 text-center hover:border-gray-400 focus:outline-none"
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-300 group-hover:text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-500 group-hover:text-gray-600">
          Drag and drop (or click) to upload a CSV file
        </span>
      </div>
    </>
  );
}
