import { createPhotoesData } from './data.js';
import { NUMBER_OF_PHOTOES } from './setup.js';
import { showBigPhotoModal } from './gallery.js';

function renderExistingPhotoes() {
  const pictures = document.querySelector('.pictures');

  const photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photoesData = createPhotoesData(NUMBER_OF_PHOTOES);
  const photoesFragment = document.createDocumentFragment();

  photoesData.forEach((photoData) => {
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

export { renderExistingPhotoes };
