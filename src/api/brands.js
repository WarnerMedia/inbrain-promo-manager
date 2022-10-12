import { API } from 'aws-amplify';
import { useQuery, useQueryClient } from 'react-query';
import { defaultBrands } from '../utils';

export async function getAllBrands() {
  return API.get('brandsApi', '/brands')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useBrands() {
  const queryClient = useQueryClient();

  return useQuery(['brands'], getAllBrands, {
    useErrorBoundary: true,
    initialData: defaultBrands,
    onSuccess: (brands) => {
      brands.forEach((brand) => {
        queryClient.setQueryData(['brands', brand.value], brand);
      });
    },
  });
}
