import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import {
  useApprovePromo,
  useDeletePromo,
  useDeleteStagePromo,
  useDeployAll,
  useRollback,
  useUpdateLivePromoIds,
  useUpdatePromo,
  useUpdateStagePromo,
  useUpdateStagePromoIds,
} from '../../api/promo';
import { useNewsfeedItems, useStageNewsfeedItems } from '../../api/newsfeed';
import CardTab from '../../components/CardTab';
import NewsfeedPanel from '../../components/Workflow/NewsfeedPanel';

export default function PromoWorkflow() {
  const stageItems = useStageNewsfeedItems();
  const liveItems = useNewsfeedItems();
  const updateStagePromo = useUpdateStagePromo();
  const updateLivePromo = useUpdatePromo();
  const deleteStagePromo = useDeleteStagePromo();
  const deleteLivePromo = useDeletePromo();
  const approvePromo = useApprovePromo();
  const updateStageIds = useUpdateStagePromoIds();
  const updateLiveIds = useUpdateLivePromoIds();
  const rollback = useRollback();
  const deployAll = useDeployAll();

  const unapprovedStageItems = stageItems.isSuccess
    ? stageItems.data.filter(({ approved }) => !approved)
    : [];
  const approvedStageItems = stageItems.isSuccess
    ? stageItems.data.filter(({ approved }) => approved)
    : [];

  return (
    <>
      <Tab.Group>
        <Tab.List className="my-8 grid grid-cols-1 gap-y-6 px-4 sm:grid-cols-3 sm:gap-x-4">
          <CardTab
            title="Staged Newsfeed Items"
            description="Edit and approve staged newsfeed items"
          />
          <CardTab
            title="Approved Newsfeed Items"
            description="View and deploy approved newsfeed items"
          />
          <CardTab
            title="Live Newsfeed Items"
            description="View newsfeed items served to users"
          />
        </Tab.List>
        <Tab.Panels as={Fragment}>
          <Tab.Panel>
            <NewsfeedPanel
              title="Staged"
              isLoading={stageItems.isLoading}
              show={true}
              data={unapprovedStageItems}
              onUpdate={updateStagePromo}
              onDelete={deleteStagePromo}
              onApprove={approvePromo}
              onUpdateAllIds={updateStageIds}
            />
          </Tab.Panel>
          <Tab.Panel>
            <NewsfeedPanel
              title="Approved"
              isLoading={stageItems.isLoading}
              show={true}
              data={approvedStageItems}
              onUpdate={updateStagePromo}
              onDelete={deleteStagePromo}
              onApprove={approvePromo}
              onDeployAll={deployAll}
            />
          </Tab.Panel>
          <Tab.Panel>
            <NewsfeedPanel
              title="Live"
              isLoading={liveItems.isLoading}
              show={true}
              data={liveItems.isSuccess ? liveItems.data : []}
              onUpdate={updateLivePromo}
              onDelete={deleteLivePromo}
              onApprove={approvePromo}
              onUpdateAllIds={updateLiveIds}
              onRollback={rollback}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
