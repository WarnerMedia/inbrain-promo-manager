import { API } from 'aws-amplify';
import { useQuery, useQueryClient } from 'react-query';

export async function getAllConfigs() {
  return API.get('configsApi', '/configs')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function usePageConfigs() {
  const queryClient = useQueryClient();

  return useQuery(['configs'], getAllConfigs, {
    useErrorBoundary: true,
    initialData: [],
    onSuccess: (configs) => {
      configs.forEach((config) => {
        queryClient.setQueryData(['configs', config.page], config);
      });
    },
  });
}
