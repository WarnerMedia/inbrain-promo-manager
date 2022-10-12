import { ChevronRightIcon } from '@heroicons/react/solid';

export default function Skeleton() {
  return (
    <div className="mx-auto mb-1 h-20 w-full rounded-md bg-white p-4 shadow">
      <div className="flex animate-pulse items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-2 w-5/6 rounded bg-gray-200"></div>
          </div>
        </div>
        <div>
          <ChevronRightIcon className="h-5 w-5 text-gray-300" />
        </div>
      </div>
    </div>
  );
}
