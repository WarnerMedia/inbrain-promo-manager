import { API } from 'aws-amplify';
import { useQuery, useQueryClient } from 'react-query';

// selector used to transform promos by defaulting the "approved" field
// to false if it does not exist
const addApprovedFlag = (data) =>
  data.map((item) => {
    // if the approved flag does not exist...
    if (!('approved' in item)) {
      // ...default it to false
      return { ...item, approved: false };
    }
    return item;
  });

export async function getAllNewsfeedItems() {
  return API.get('liveNewsfeedApi', '/liveNewsfeed')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useNewsfeedItems() {
  const queryClient = useQueryClient();

  return useQuery(['newsfeed'], getAllNewsfeedItems, {
    useErrorBoundary: true,
    select: addApprovedFlag,
    onSuccess: (newItems) => {
      newItems.forEach((item) => {
        queryClient.setQueryData(['newsfeed', item.id], item);
      });
    },
  });
}

export async function getAllStageNewsfeedItems() {
  return API.get('stageNewsfeedApi', '/stageNewsfeed')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useStageNewsfeedItems() {
  const queryClient = useQueryClient();

  return useQuery(['newsfeed', 'stage'], getAllStageNewsfeedItems, {
    useErrorBoundary: true,
    select: addApprovedFlag,
    onSuccess: (newItems) => {
      newItems.forEach((item) => {
        queryClient.setQueryData(['newsfeed', 'stage', item.id], item);
      });
    },
  });
}
