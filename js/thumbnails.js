import { showBigPhotoModal } from './gallery.js';
import { FILTER_TYPE } from './filter.js';
import { RANDOM_PHOTOES_NUMBER } from './setup.js';
import { getPositiveRandomInt } from './utils.js';

const pictures = document.querySelector('.pictures');

function applyFilter(photoes, filter) {
  switch (filter) {
    case FILTER_TYPE.RANDOM:
      return getRandomPhotoes(photoes, RANDOM_PHOTOES_NUMBER);
    case FILTER_TYPE.DISCUSSED:
      return sortDiscussedPhotoes(photoes);
    default:
      return photoes;
  }
}

function getRandomPhotoes(photoes, number) {
  return photoes
    .slice()
    .sort((photoOne) => photoOne.id - getPositiveRandomInt(photoOne.id - 5, photoOne.id + 5))
    .slice(0, number);
}

function sortDiscussedPhotoes(photoes) {
  return photoes
    .slice()
    .sort((photoOne, photoTwo) => photoTwo.comments.length - photoOne.comments.length);
}

function renderPhotoes(photoesData, filter = FILTER_TYPE.DEFAULT) {
  const photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  pictures.querySelectorAll('.picture').forEach((picture) => picture.remove());

  const photoesFragment = document.createDocumentFragment();

  applyFilter(photoesData, filter).forEach((photoData) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoData.url;
    photoElement.querySelector('.picture__likes').textContent = photoData.likes;
    photoElement.querySelector('.picture__comments').textContent = photoData.comments.length;
    photoElement.dataset.photoId = photoData.id;
    photoesFragment.append(photoElement);
  });

  pictures.append(photoesFragment);

  pictures.addEventListener('click', (evt) => {
    const parent = evt.target.closest('.picture');
    if(parent) {
      const linkedData = photoesData.find((photoData) => photoData.id === Number(parent.dataset.photoId));
      showBigPhotoModal(linkedData);
    }
  });
}

export { renderPhotoes };
