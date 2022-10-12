import { useStagePromo, useUpdateStagePromo } from '../api/promo';
import PromoForm from '../components/Forms/PromoForm';

export default function Promo() {
  const updateMutation = useUpdateStagePromo();
  const { data } = useStagePromo();

  const onSubmit = (promo) => {
    updateMutation.mutate(promo);
  };

  return (
    <PromoForm
      onSubmit={onSubmit}
      promo={data}
      isLoading={updateMutation.isLoading}
      isError={updateMutation.isError}
    />
  );
}
