import { createDescriptions } from './data.js';
import { DESCRIPTIONS_COUNT } from './setup.js';

const pictures = document.querySelector('.pictures');

const otherPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const otherPicturesData = createDescriptions(DESCRIPTIONS_COUNT);
const otherPicturesFragment = document.createDocumentFragment();

otherPicturesData.forEach((pictureData) => {
  const otherPicture = otherPictureTemplate.cloneNode(true);
  otherPicture.querySelector('.picture__img').src = pictureData.url;
  otherPicture.querySelector('.picture__likes').textContent = pictureData.likes;
  otherPicture.querySelector('.picture__comments').textContent = pictureData.comments.length;
  otherPicturesFragment.append(otherPicture);
});

pictures.append(otherPicturesFragment);
