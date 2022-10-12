import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import HelpDialog from './HelpDialog';
import Navigation from './Navigation';
import UserAccountDropdown from './UserAccountDropdown';
import LogoContainer from './LogoContainer';
import PageTitle from './PageTitle';
import SearchHeader from './SearchHeader';
import SidebarSearch from './SidebarSearch';
import MobileSidebar from './MobileSidebar';

export default function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="min-h-full">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setHelpOpen={setHelpOpen}
      />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
        <LogoContainer className="flex flex-shrink-0 items-center px-6" />
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
          {/* User account dropdown */}
          <UserAccountDropdown setHelpOpen={setHelpOpen} />
          {/* Sidebar Search */}
          <SidebarSearch />
          {/* Navigation */}
          <nav className="mt-6 space-y-8 px-3">
            <Navigation />
          </nav>
        </div>
      </div>
      {/* Main column */}
      <div className="flex flex-col lg:pl-64">
        {/* Search header */}
        <SearchHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">
          {/* Page title & actions */}
          <PageTitle title={title} />
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
      <HelpDialog helpOpen={helpOpen} setHelpOpen={setHelpOpen} />
    </div>
  );
}
