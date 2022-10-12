import { API } from 'aws-amplify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

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

export async function getCampaignId(campaign) {
  return campaign.name.replace(/[-]|\s/g, '_');
}

export function useUpdateStageCampaignIds() {
  const queryClient = useQueryClient();

  return useMutation(
    (campaigns) =>
      Promise.all(
        campaigns.map(async (campaign) => {
          const id = await getCampaignId(campaign);
          await deleteStageCampaign(campaign.id);
          return createStageCampaign({
            ...campaign,
            id,
          });
        })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campaigns', 'stage']);
      },
    }
  );
}

export function useUpdateLiveCampaignIds() {
  const queryClient = useQueryClient();

  return useMutation(
    (campaigns) =>
      Promise.all(
        campaigns.map(async (campaign) => {
          const id = await getCampaignId(campaign);
          await deleteCampaign(campaign.id);
          return createCampaign({
            ...campaign,
            id,
          });
        })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campaigns']);
      },
    }
  );
}

export async function getAllCampaigns() {
  return API.get('liveCampaignsApi', '/liveCampaigns')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useCampaigns() {
  const queryClient = useQueryClient();

  return useQuery(['campaigns'], getAllCampaigns, {
    useErrorBoundary: true,
    select: addApprovedFlag,
    onSuccess: (campaigns) => {
      campaigns.forEach((campaign) => {
        queryClient.setQueryData(['campaigns', campaign.id], campaign);
      });
    },
  });
}

export async function getAllStageCampaigns() {
  return API.get('stageCampaignsApi', '/stageCampaigns')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useStageCampaigns() {
  const queryClient = useQueryClient();

  return useQuery(['campaigns', 'stage'], getAllStageCampaigns, {
    useErrorBoundary: true,
    select: addApprovedFlag,
    onSuccess: (newCampaigns) => {
      newCampaigns.forEach((campaign) => {
        queryClient.setQueryData(['campaigns', 'stage', campaign.id], campaign);
      });
    },
  });
}

export async function getCampaign(id) {
  return API.get(
    'liveCampaignsApi',
    `/liveCampaigns/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useCampaign() {
  const { id } = useParams();

  return useQuery(['campaigns', id], () => getCampaign(id), {
    enabled: !!id,
    initialData: {
      id: '',
      approved: false,
      name: '',
      pageConfigs: [],
      promoId: '',
      segments: [],
      slotIndex: 0,
      type: 'campaign',
    },
  });
}

export async function getStageCampaign(id) {
  return API.get(
    'stageCampaignsApi',
    `/stageCampaigns/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useStageCampaign() {
  const { id } = useParams();

  return useQuery(['campaigns', 'stage', id], () => getStageCampaign(id), {
    enabled: !!id,
    initialData: {
      id: '',
      approved: false,
      name: '',
      pageConfigs: [],
      promoId: '',
      segments: [],
      slotIndex: 0,
      type: 'campaign',
    },
  });
}

export async function createCampaign(campaign) {
  const id = await getCampaignId(campaign);

  return API.post('liveCampaignsApi', '/liveCampaigns', {
    body: {
      ...campaign,
      id: id,
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (campaign) =>
      createStageCampaign({
        ...campaign,
        brand: campaign.brand?.value,
      }),
    {
      onSuccess: (campaign) => {
        queryClient.invalidateQueries(['campaigns']);
        queryClient.setQueryData(['campaigns', campaign.id], campaign);
        navigate('/');
      },
    }
  );
}

export async function createStageCampaign(campaign) {
  const id = await getCampaignId(campaign);

  return API.post('stageCampaignsApi', '/stageCampaigns', {
    body: {
      ...campaign,
      id: id,
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useCreateStageCampaign() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (campaign) =>
      createStageCampaign({
        ...campaign,
        brand: campaign.brand?.value,
      }),
    {
      onSuccess: (campaign) => {
        queryClient.invalidateQueries(['campaigns', 'stage']);
        queryClient.setQueryData(['campaigns', 'stage', campaign.id], campaign);
        navigate('/');
      },
    }
  );
}

export async function updateStageCampaign(campaign) {
  return API.put('stageCampaignsApi', '/stageCampaigns', {
    body: campaign,
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useUpdateStageCampaign() {
  const queryClient = useQueryClient();

  return useMutation(
    (campaign) =>
      updateStageCampaign({
        ...campaign,
        brand: campaign.brand?.value,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campaigns', 'stage']);
      },
    }
  );
}

export function useApproveCampaign() {
  const queryClient = useQueryClient();
  return useMutation((campaign) => updateStageCampaign(campaign), {
    onSuccess: ({ body }) => {
      queryClient.setQueryData(['campaigns', 'stage', body.id], body);
      queryClient.invalidateQueries(['campaigns', 'stage']);
    },
  });
}

export async function deleteStageCampaign(id) {
  return API.del(
    'stageCampaignsApi',
    `/stageCampaigns/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useDeleteStageCampaign() {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteStageCampaign(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', 'stage']);
    },
  });
}

export async function rollbackCampaign(campaign) {
  return Promise.all([
    API.post('stageCampaignsApi', '/stageCampaigns', {
      body: campaign,
    }),
    API.del(
      'liveCampaignsApi',
      `/liveCampaigns/${encodeURIComponent(campaign.id).replace(/[*]/g, '%2A')}`
    ),
  ])
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useRollbackCampaign() {
  const queryClient = useQueryClient();

  return useMutation((promo) => rollbackCampaign(promo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', 'stage']);
      queryClient.invalidateQueries(['campaigns']);
    },
  });
}

export async function deployCampaign(campaign) {
  return Promise.all([
    API.post('liveCampaignsApi', '/liveCampaigns', {
      body: campaign,
    }),
    API.del(
      'stageCampaignsApi',
      `/stageCampaigns/${encodeURIComponent(campaign.id).replace(
        /[*]/g,
        '%2A'
      )}`
    ),
  ])
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useDeployCampaigns() {
  const queryClient = useQueryClient();

  return useMutation(
    (campaigns) =>
      Promise.all(campaigns.map((campaign) => deployCampaign(campaign))),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campaigns', 'stage']);
        queryClient.invalidateQueries(['campaigns']);
      },
    }
  );
}

export async function updateCampaign(campaign) {
  return API.put('liveCampaignsApi', '/liveCampaigns', {
    body: campaign,
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation(
    (campaign) =>
      updateCampaign({
        ...campaign,
        brand: campaign.brand?.value,
        type: campaign.promoType?.value,
      }),
    {
      onSuccess: (campaign) => {
        queryClient.invalidateQueries(['campaigns']);
        queryClient.setQueryData(['campaigns', campaign.id], campaign);
      },
    }
  );
}

export async function deleteCampaign(id) {
  return API.del(
    'liveCampaignsApi',
    `/liveCampaigns/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteCampaign(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
    },
  });
}
