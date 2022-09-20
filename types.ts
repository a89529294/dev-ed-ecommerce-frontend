export type P = {
  title: string;
  description: string;
  image: {
    data: {
      attributes: {
        formats: {
          large: { url: string };
          medium: { url: string };
          small: { url: string };
          thumbnail: { url: string };
        };
      };
    };
  };
  price: number;
  slug: string;
};
