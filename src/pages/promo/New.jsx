import { useCreateStagePromo } from '../../api/promo';
import PromoForm from '../../components/Forms/PromoForm';

export default function NewPromo() {
  const createMutation = useCreateStagePromo();

  const onSubmit = (promo) => {
    createMutation.mutate(promo);
  };

  return (
    <PromoForm
      onSubmit={onSubmit}
      create={true}
      isLoading={createMutation.isLoading}
      isError={createMutation.isError}
    />
  );
}
