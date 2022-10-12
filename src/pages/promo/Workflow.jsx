import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import {
  useApprovePromo,
  useDeletePromo,
  useDeleteStagePromo,
  useDeployAll,
  usePromos,
  useRollback,
  useStagePromos,
  useUpdateLivePromoIds,
  useUpdatePromo,
  useUpdateStagePromo,
  useUpdateStagePromoIds,
} from '../../api/promo';
import CardTab from '../../components/CardTab';
import PromoPanel from '../../components/Workflow/PromoPanel';

export default function PromoWorkflow() {
  const stagePromos = useStagePromos();
  const livePromos = usePromos();
  const updateStagePromo = useUpdateStagePromo();
  const updateLivePromo = useUpdatePromo();
  const deleteStagePromo = useDeleteStagePromo();
  const deleteLivePromo = useDeletePromo();
  const approvePromo = useApprovePromo();
  const updateStageIds = useUpdateStagePromoIds();
  const updateLiveIds = useUpdateLivePromoIds();
  const rollback = useRollback();
  const deployAll = useDeployAll();

  const unapprovedStagePromos = stagePromos.isSuccess
    ? stagePromos.data.filter(({ approved }) => !approved)
    : [];
  const approvedStagePromos = stagePromos.isSuccess
    ? stagePromos.data.filter(({ approved }) => approved)
    : [];

  return (
    <>
      <Tab.Group>
        <Tab.List className="my-8 grid grid-cols-1 gap-y-6 px-4 sm:grid-cols-3 sm:gap-x-4">
          <CardTab
            title="Staged Promos"
            description="Edit and approve staged promos"
          />
          <CardTab
            title="Approved Promos"
            description="View and deploy approved promos"
          />
          <CardTab
            title="Live Promos"
            description="View promos served to users"
          />
        </Tab.List>
        <Tab.Panels as={Fragment}>
          <Tab.Panel>
            <PromoPanel
              title="Staged"
              isLoading={stagePromos.isLoading}
              show={true}
              data={unapprovedStagePromos}
              onUpdate={updateStagePromo}
              onDelete={deleteStagePromo}
              onApprove={approvePromo}
              onUpdateAllIds={updateStageIds}
            />
          </Tab.Panel>
          <Tab.Panel>
            <PromoPanel
              title="Approved"
              isLoading={stagePromos.isLoading}
              show={true}
              data={approvedStagePromos}
              onUpdate={updateStagePromo}
              onDelete={deleteStagePromo}
              onApprove={approvePromo}
              onDeployAll={deployAll}
            />
          </Tab.Panel>
          <Tab.Panel>
            <PromoPanel
              title="Live"
              isLoading={livePromos.isLoading}
              show={true}
              data={livePromos.isSuccess ? livePromos.data : []}
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
