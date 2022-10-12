import { API } from 'aws-amplify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useBrands } from './brands';
import { useNewsfeedItems, useStageNewsfeedItems } from './newsfeed';
import { defaultBrands, promoTypes } from '../utils';

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

export function useUpdateStagePromoIds() {
  const queryClient = useQueryClient();

  return useMutation(
    (promos) =>
      Promise.all(
        promos.map(async (promo) => {
          const id = uuid();
          await deleteStagePromo(promo.id);
          return createStagePromo({
            ...promo,
            id,
          });
        })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['promos', 'stage']);
        queryClient.invalidateQueries(['newsfeed', 'stage']);
      },
    }
  );
}

export function useUpdateLivePromoIds() {
  const queryClient = useQueryClient();

  return useMutation(
    (promos) =>
      Promise.all(
        promos.map(async (promo) => {
          const id = uuid();
          await deletePromo(promo.id);
          return createPromo({
            ...promo,
            id,
          });
        })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['promos']);
        queryClient.invalidateQueries(['newsfeed']);
      },
    }
  );
}

export async function getAllPromos() {
  return API.get('livePromosApi', '/livePromos')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function usePromos() {
  const queryClient = useQueryClient();

  return useQuery(['promos'], getAllPromos, {
    useErrorBoundary: true,
    select: addApprovedFlag,
    onSuccess: (newPromos) => {
      newPromos.forEach((promo) => {
        queryClient.setQueryData(['promos', promo.id], promo);
      });
    },
  });
}

export async function getPromo(id) {
  return API.get(
    'livePromosApi',
    `/livePromos/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function usePromo() {
  const { id } = useParams();

  return useQuery(['promos', id], () => getPromo(id), {
    enabled: !!id,
    initialData: {
      image: {
        alt: '',
        src: '',
      },
      brand: defaultBrands[0].value,
      text: '',
      date: '',
      link: '',
      id: '',
      logo: {
        alt: '',
        src: '',
        style: '',
      },
      subtext: '',
      type: promoTypes[0].value,
    },
  });
}

export async function createPromo(promo) {
  const id = uuid();

  return API.post('livePromosApi', '/livePromos', {
    body: {
      ...promo,
      id: id,
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useCreatePromo() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (promo) =>
      createPromo({
        id: promo.id,
        brand: promo.brand?.value,
        text: promo.text,
        subtext: promo.subtext,
        date: promo.date,
        link: promo.link,
        image: {
          src: promo.image.src,
          alt: promo.text,
        },
        logo: {
          src: promo.brand?.logo.src,
          alt: promo.brand?.logo.alt,
          style: promo.brand?.logo.style,
        },
        type: promo.promoType?.value,
        approved: false,
      }),
    {
      onSuccess: (promo) => {
        queryClient.invalidateQueries(['promos']);
        queryClient.setQueryData(['promos', promo.id], promo);
        navigate('/');
      },
    }
  );
}

export async function updatePromo(promo) {
  return API.put('livePromosApi', '/livePromos', {
    body: promo,
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useUpdatePromo() {
  const queryClient = useQueryClient();

  return useMutation(
    (promo) =>
      updatePromo({
        ...promo,
        brand: promo.brand?.value,
        type: promo.promoType?.value,
      }),
    {
      onSuccess: (promo) => {
        queryClient.invalidateQueries(['promos']);
        queryClient.setQueryData(['promos', promo.id], promo);
      },
    }
  );
}

export function useApprovePromo() {
  const queryClient = useQueryClient();
  return useMutation((promo) => updateStagePromo(promo), {
    onSuccess: ({ body }) => {
      const queryKey =
        body.type === 'newsfeed' ? ['newsfeed', 'stage'] : ['promos', 'stage'];

      queryClient.setQueryData([...queryKey, body.id], body);
      queryClient.invalidateQueries(queryKey);
    },
  });
}

export async function deletePromo(id) {
  return API.del(
    'livePromosApi',
    `/livePromos/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useDeletePromo() {
  const queryClient = useQueryClient();

  return useMutation((id) => deletePromo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['promos']);
    },
  });
}

export async function getAllStagePromos() {
  return API.get('stagePromosApi', '/stagePromos')
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useStagePromos() {
  const queryClient = useQueryClient();

  return useQuery(['promos', 'stage'], getAllStagePromos, {
    useErrorBoundary: true,
    select: addApprovedFlag,
    onSuccess: (newPromos) => {
      newPromos.forEach((promo) => {
        queryClient.setQueryData(['promos', 'stage', promo.id], promo);
      });
    },
  });
}

export async function getStagePromo(id) {
  return API.get(
    'stagePromosApi',
    `/stagePromos/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useStagePromo() {
  const { id } = useParams();

  return useQuery(['promos', 'stage', id], () => getStagePromo(id), {
    enabled: !!id,
    initialData: {
      image: {
        alt: '',
        src: '',
      },
      brand: defaultBrands[0].value,
      text: '',
      date: '',
      link: '',
      id: '',
      logo: {
        alt: '',
        src: '',
        style: '',
      },
      subtext: '',
      type: promoTypes[0].value,
    },
  });
}

export async function createStagePromo(promo) {
  const id = uuid();

  return API.post('stagePromosApi', '/stagePromos', {
    body: {
      ...promo,
      id: id,
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useCreateStagePromo() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (promo) =>
      createStagePromo({
        ...promo,
        brand: promo.brand?.value,
        type: promo.type?.value,
      }),
    {
      onSuccess: (promo) => {
        queryClient.invalidateQueries(['promos', 'stage']);
        queryClient.setQueryData(['promos', 'stage', promo.id], promo);
        navigate('/');
      },
    }
  );
}

export async function updateStagePromo(promo) {
  return API.put('stagePromosApi', '/stagePromos', {
    body: promo,
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useUpdateStagePromo() {
  const queryClient = useQueryClient();

  return useMutation(
    (promo) =>
      updateStagePromo({
        ...promo,
        brand: promo.brand?.value,
        type: promo.promoType?.value,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['promos', 'stage']);
      },
    }
  );
}

export async function deleteStagePromo(id) {
  return API.del(
    'stagePromosApi',
    `/stagePromos/${encodeURIComponent(id).replace(/[*]/g, '%2A')}`
  )
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useDeleteStagePromo() {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteStagePromo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['promos', 'stage']);
    },
  });
}

export async function deployPromo(promo) {
  return Promise.all([
    API.post('livePromosApi', '/livePromos', {
      body: promo,
    }),
    API.del(
      'stagePromosApi',
      `/stagePromos/${encodeURIComponent(promo.id).replace(/[*]/g, '%2A')}`
    ),
  ])
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useDeployAll() {
  const queryClient = useQueryClient();

  return useMutation(
    (promos) => Promise.all(promos.map((promo) => deployPromo(promo))),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['promos', 'stage']);
        queryClient.invalidateQueries(['promos']);
      },
    }
  );
}

export async function rollbackPromo(promo) {
  return Promise.all([
    API.post('stagePromosApi', '/stagePromos', {
      body: promo,
    }),
    API.del(
      'livePromosApi',
      `/livePromos/${encodeURIComponent(promo.id).replace(/[*]/g, '%2A')}`
    ),
  ])
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useRollback() {
  const queryClient = useQueryClient();

  return useMutation((promo) => rollbackPromo(promo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['promos', 'stage']);
      queryClient.invalidateQueries(['promos']);
    },
  });
}

export async function importPromo(promo) {
  const id = uuid();

  return API.post('stagePromosApi', '/import', {
    body: {
      ...promo,
      id: id,
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export function useBulkImport() {
  const queryClient = useQueryClient();
  const brands = useBrands();
  const stagePromos = useStagePromos();
  const promos = usePromos();
  const stageNewsfeedItems = useStageNewsfeedItems();
  const newsfeedItems = useNewsfeedItems();

  return useMutation(
    (promos) =>
      Promise.all(
        promos.map((promo) => {
          const stagePromoData = queryClient.getQueryData([
            'promos',
            'stage',
            promo.id,
          ]);
          const promoData = queryClient.getQueryData(['promos', promo.id]);
          const stageNewsfeedData = queryClient.getQueryData([
            'newsfeed',
            'stage',
            promo.id,
          ]);
          const newsfeedData = queryClient.getQueryData(['newsfeed', promo.id]);
          const brand = brands.data.find(
            (b) => b.value === promo.brand.replace(/\s/g, '')
          );

          if (
            typeof stagePromoData === 'undefined' &&
            typeof promoData === 'undefined' &&
            typeof stageNewsfeedData === 'undefined' &&
            typeof newsfeedData === 'undefined'
          ) {
            return importPromo({
              id: promo.id,
              brand: brand.value.replace(/\s/g, ''),
              text: promo.text,
              subtext: promo.subtext,
              link: promo.link,
              image: {
                src: promo.imageSrc,
                alt: promo.text,
              },
              logo: {
                src: brand.logo.src,
                alt: brand.logo.alt,
                style: brand.logo.style,
              },
              type: promo.type,
              date: promo.date,
              approved: false,
            });
          } else {
            return Promise.resolve();
          }
        })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['promos', 'stage']);
        queryClient.invalidateQueries(['newsfeed', 'stage']);
      },
      enabled:
        brands.isSuccess &&
        stagePromos.isSuccess &&
        promos.isSuccess &&
        stageNewsfeedItems.isSuccess &&
        newsfeedItems.isSuccess,
    }
  );
}
