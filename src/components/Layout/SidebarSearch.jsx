import { SearchIcon } from '@heroicons/react/solid';

export default function SidebarSearch() {
  return (
    <div className="mt-5 px-3">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <SearchIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-gray-300 pl-9 focus:border-brand focus:ring-brand sm:text-sm"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
