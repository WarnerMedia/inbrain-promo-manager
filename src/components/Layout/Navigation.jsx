import {
  CloudDownloadIcon,
  CloudUploadIcon,
  CollectionIcon,
  NewspaperIcon,
  PhotographIcon,
} from '@heroicons/react/outline';
import NavLink from './NavLink';

export default function Navigation() {
  return (
    <>
      <div className="space-y-1">
        <NavLink to="/import" icon={CloudUploadIcon}>
          Import
        </NavLink>
        <NavLink to="/export" icon={CloudDownloadIcon}>
          Export
        </NavLink>
      </div>
      <div>
        <h3
          className="text-xs font-semibold uppercase tracking-wider text-gray-500"
          id="mobile-headline"
        >
          Workflow
        </h3>
        <div
          className="mt-3 space-y-1"
          role="group"
          aria-labelledby="mobile-headline"
        >
          <NavLink to="/" icon={PhotographIcon}>
            Promos
          </NavLink>
          <NavLink to="/newsfeed/workflow" icon={NewspaperIcon}>
            Newsfeed
          </NavLink>
          <NavLink to="/campaign/workflow" icon={CollectionIcon}>
            Campaigns
          </NavLink>
        </div>
      </div>
    </>
  );
}
