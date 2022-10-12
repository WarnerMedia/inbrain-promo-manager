// This data serves as a stopgap until we figure out how to maintain a list of
// supported brands that scales well. Maybe in S3/Dynamo?
export const defaultBrands = [
  {
    value: 'brand1',
    logo: {
      alt: 'Brand 1 logo',
      src: 'https://via.placeholder.com/410/230/',
      style: 'inbrain-logo',
    },
    name: 'Brand 1',
  },
];

export const promoTypes = [
  {
    name: 'Feature',
    value: 'feature',
  },
  {
    name: 'Series',
    value: 'series',
  },
  {
    name: 'News Feed',
    value: 'newsfeed',
  },
  {
    name: 'Campaign',
    value: 'campaign',
  },
];

export const validation = {
  url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
};
