import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';
import Spinner from './components/Spinner';

const Export = lazy(() => import('./pages/Export'));
const Import = lazy(() => import('./pages/Import'));
const EditPromo = lazy(() => import('./pages/promo/Edit'));
const NewPromo = lazy(() => import('./pages/promo/New'));
const PromoWorkflow = lazy(() => import('./pages/promo/Workflow'));
const EditCampaign = lazy(() => import('./pages/campaign/Edit'));
const NewCampaign = lazy(() => import('./pages/campaign/New'));
const CampaignWorkflow = lazy(() => import('./pages/campaign/Workflow'));
const EditNewsfeed = lazy(() => import('./pages/newsfeed/Edit'));
const NewNewsfeed = lazy(() => import('./pages/newsfeed/New'));
const NewsfeedWorkflow = lazy(() => import('./pages/newsfeed/Workflow'));

function Fallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
      <div className="ml-6 text-3xl font-bold text-gray-700">Loading...</div>
    </div>
  );
}

function Container({ title, children }) {
  return (
    <Layout title={title}>
      <Suspense fallback={<Fallback />}>{children}</Suspense>
    </Layout>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <Container title="Promo Workflow">
                <PromoWorkflow />
              </Container>
            }
          />
          <Route
            path="newsfeed/workflow"
            element={
              <Container title="Newsfeed Workflow">
                <NewsfeedWorkflow />
              </Container>
            }
          />
          <Route
            path="campaign/workflow"
            element={
              <Container title="Campaign Workflow">
                <CampaignWorkflow />
              </Container>
            }
          />
          <Route
            path="promo/:id"
            element={
              <Container title="Edit Promo">
                <EditPromo />
              </Container>
            }
          />
          <Route
            path="newsfeed/:id"
            element={
              <Container title="Edit Newsfeed">
                <EditNewsfeed />
              </Container>
            }
          />
          <Route
            path="campaign/:id"
            element={
              <Container title="Edit Campaign">
                <EditCampaign />
              </Container>
            }
          />
          <Route
            path="promo/new"
            element={
              <Container title="Create Promo">
                <NewPromo />
              </Container>
            }
          />
          <Route
            path="campaign/new"
            element={
              <Container title="Create Campaign">
                <NewCampaign />
              </Container>
            }
          />
          <Route
            path="newsfeed/new"
            element={
              <Container title="Create Newsfeed">
                <NewNewsfeed />
              </Container>
            }
          />
          <Route
            path="import"
            element={
              <Container title="Import">
                <Import />
              </Container>
            }
          />
          <Route
            path="export"
            element={
              <Container title="Export">
                <Export />
              </Container>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
