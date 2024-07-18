import { getPhotos } from './js/pixabay-api.js';
import { perPage } from './js/pixabay-api.js';
import { renderPhotos } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ref = {
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
  loadMoreBtn: document.querySelector('.loadBtn'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

let request = null;
let totalPages = null;
let currentPage = 1;

const bigImg = new SimpleLightbox('.gallery a');
bigImg.options.captionsData = 'alt';
bigImg.options.captionDelay = 250;

const onFormSubmit = async event => {
  event.preventDefault();

  currentPage = 1;
  request = ref.input.value.trim();
  ref.gallery.innerHTML = '';

  // check input
  if (!request) {
    iziToast.error({
      message: 'Field can not be empty',
      position: 'topRight',
      timeout: 2000,
    });
    ref.loadMoreBtn.style = 'display:none';
    return;
  }

  // load data
  try {
    ref.loader.style = 'display:block';
    const { hits, total } = await getPhotos(request, currentPage);

    setTimeout(() => {
      ref.loader.style = 'display:none';

      // check if we received any data
      if (!hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
          timeout: 2000,
        });
        return;
      }

      // render data
      ref.gallery.innerHTML = renderPhotos(hits);

      // check how many pages
      totalPages = Math.ceil(total / perPage);

      if (totalPages > 1) ref.loadMoreBtn.style = 'display:block';
      else ref.loadMoreBtn.style = 'display:none';

      bigImg.refresh();
    }, 500);
  } catch (error) {}

  //reset form
  ref.form.reset();
};

const scroll = () => {
  // scrolling
  const imgHeigth =
    ref.gallery.querySelector('.gallery-item').getBoundingClientRect().height *
    2;

  window.scrollBy({
    top: imgHeigth,
    left: 0,
    behavior: 'smooth',
  });
};

const onLoadMore = async () => {
  currentPage += 1;

  try {
    ref.loader.style = 'display:block';
    const { hits } = await getPhotos(request, currentPage);

    setTimeout(() => {
      ref.loader.style = 'display:none';

      // render data
      ref.gallery.insertAdjacentHTML('beforeend', renderPhotos(hits));
      scroll();

      // check how many pages
      if (currentPage >= totalPages) {
        ref.loadMoreBtn.style = 'display:none';
        ref.loadMoreBtn.removeEventListener('click', onLoadMore);
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
          timeout: 2000,
        });
      }

      bigImg.refresh();
    }, 500);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
};

ref.form.addEventListener('submit', onFormSubmit);
ref.loadMoreBtn.addEventListener('click', onLoadMore);
bigImg.on('show.simplelightbox', () => {});
