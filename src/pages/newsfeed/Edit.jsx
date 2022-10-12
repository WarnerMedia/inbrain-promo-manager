import { useStagePromo, useUpdateStagePromo } from '../../api/promo';
import NewsfeedForm from '../../components/Forms/NewsfeedForm';

export default function EditNewsfeed() {
  const updateMutation = useUpdateStagePromo();
  const { data } = useStagePromo();

  const onSubmit = (promo) => {
    updateMutation.mutate(promo);
  };

  return (
    <NewsfeedForm
      onSubmit={onSubmit}
      promo={data}
      isLoading={updateMutation.isLoading}
      isError={updateMutation.isError}
    />
  );
}
