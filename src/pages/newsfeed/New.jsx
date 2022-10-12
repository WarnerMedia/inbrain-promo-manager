import { useCreateStagePromo } from '../../api/promo';
import NewsfeedForm from '../../components/Forms/NewsfeedForm';

export default function NewNewsfeed() {
  const createMutation = useCreateStagePromo();

  const onSubmit = (promo) => {
    createMutation.mutate(promo);
  };

  return (
    <NewsfeedForm
      onSubmit={onSubmit}
      create={true}
      isLoading={createMutation.isLoading}
      isError={createMutation.isError}
    />
  );
}
