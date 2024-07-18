const baseURL = 'https://pixabay.com/api/';
const apiKEY = '43864553-6e6fc803e67c38d9a685f3364';
export const perPage = 15;

import axios from 'axios';
axios.defaults.baseURL = baseURL;
// axios.defaults.headers.common['key'] = apiKEY;

export const getPhotos = async (q, currentPage) => {
  try {
    const photos = await axios({
      params: {
        key: apiKEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage,
      },
    });
    return photos.data;
  } catch (error) {
    console.log(error);
  }
};
