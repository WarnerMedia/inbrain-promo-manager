import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import {
  useApproveCampaign,
  useCampaigns,
  useDeleteCampaign,
  useDeleteStageCampaign,
  useDeployCampaigns,
  useRollbackCampaign,
  useStageCampaigns,
  useUpdateCampaign,
  useUpdateLiveCampaignIds,
  useUpdateStageCampaign,
} from '../../api/campaign';
import CardTab from '../../components/CardTab';
import CampaignPanel from '../../components/Workflow/CampaignPanel';

export default function CampaignWorkflow() {
  const stageCampaigns = useStageCampaigns();
  const liveCampaigns = useCampaigns();
  const updateStagePromo = useUpdateStageCampaign();
  const updateLivePromo = useUpdateCampaign();
  const deleteStagePromo = useDeleteStageCampaign();
  const deleteLivePromo = useDeleteCampaign();
  const approvePromo = useApproveCampaign();
  const updateStageIds = useUpdateStageCampaign();
  const updateLiveIds = useUpdateLiveCampaignIds();
  const rollback = useRollbackCampaign();
  const deployAll = useDeployCampaigns();

  const unapprovedStageCampaigns = stageCampaigns.isSuccess
    ? stageCampaigns.data.filter(({ approved }) => !approved)
    : [];
  const approvedStageCampaigns = stageCampaigns.isSuccess
    ? stageCampaigns.data.filter(({ approved }) => approved)
    : [];

  return (
    <>
      <Tab.Group>
        <Tab.List className="my-8 grid grid-cols-1 gap-y-6 px-4 sm:grid-cols-3 sm:gap-x-4">
          <CardTab
            title="Staged Campaigns"
            description="Edit and approve staged campaigns"
          />
          <CardTab
            title="Approved Campaigns"
            description="View and deploy approved campaigns"
          />
          <CardTab
            title="Live Campaigns"
            description="View campaigns served to users"
          />
        </Tab.List>
        <Tab.Panels as={Fragment}>
          <Tab.Panel>
            <CampaignPanel
              title="Staged"
              isLoading={stageCampaigns.isLoading}
              show={true}
              data={unapprovedStageCampaigns}
              onUpdate={updateStagePromo}
              onDelete={deleteStagePromo}
              onApprove={approvePromo}
              onUpdateAllIds={updateStageIds}
            />
          </Tab.Panel>
          <Tab.Panel>
            <CampaignPanel
              title="Approved"
              isLoading={stageCampaigns.isLoading}
              show={true}
              data={approvedStageCampaigns}
              onUpdate={updateStagePromo}
              onDelete={deleteStagePromo}
              onApprove={approvePromo}
              onDeployAll={deployAll}
            />
          </Tab.Panel>
          <Tab.Panel>
            <CampaignPanel
              title="Live"
              isLoading={liveCampaigns.isLoading}
              show={true}
              data={liveCampaigns.isSuccess ? liveCampaigns.data : []}
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
