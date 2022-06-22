import { createDescriptions } from './data.js';
import { DESCRIPTIONS_COUNT } from './setup.js';
import { showBigPicture } from './gallery.js';

const pictures = document.querySelector('.pictures');

const otherPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const otherPicturesData = createDescriptions(DESCRIPTIONS_COUNT);
const otherPicturesFragment = document.createDocumentFragment();

function addPictureHandler(picture, pictureData) {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();

    showBigPicture(pictureData);
  });
}

otherPicturesData.forEach((pictureData) => {
  const otherPicture = otherPictureTemplate.cloneNode(true);
  otherPicture.querySelector('.picture__img').src = pictureData.url;
  otherPicture.querySelector('.picture__likes').textContent = pictureData.likes;
  otherPicture.querySelector('.picture__comments').textContent = pictureData.comments.length;
  addPictureHandler(otherPicture, pictureData);
  otherPicturesFragment.append(otherPicture);
});

pictures.append(otherPicturesFragment);
