import { useCreateStageCampaign } from '../../api/campaign';
import CampaignForm from '../../components/Forms/CampaignForm';

export default function NewCampaign() {
  const createMutation = useCreateStageCampaign();

  const onSubmit = (campaign) => {
    createMutation.mutate(campaign);
  };

  return (
    <CampaignForm
      onSubmit={onSubmit}
      create={true}
      isLoading={createMutation.isLoading}
      isError={createMutation.isError}
    />
  );
}
