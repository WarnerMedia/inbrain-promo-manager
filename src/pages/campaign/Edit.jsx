import { useStageCampaign, useUpdateStageCampaign } from '../../api/campaign';
import CampaignForm from '../../components/Forms/CampaignForm';

export default function EditPromo() {
  const updateMutation = useUpdateStageCampaign();
  const { data } = useStageCampaign();

  const onSubmit = (promo) => {
    updateMutation.mutate(promo);
  };

  return (
    <CampaignForm
      onSubmit={onSubmit}
      promo={data}
      isLoading={updateMutation.isLoading}
      isError={updateMutation.isError}
    />
  );
}
