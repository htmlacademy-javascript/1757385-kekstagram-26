import { createEscapeKeydownHandler } from './utils.js';

const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureImage = bigPictureWindow.querySelector('.big-picture__img').querySelector('img');
const bigPictureSocial = bigPictureWindow.querySelector('.big-picture__social');
const likesCount = bigPictureSocial.querySelector('.social__likes').querySelector('.likes-count');
const commentsCount = bigPictureSocial.querySelector('.comments-count');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialCaption = bigPictureSocial.querySelector('.social__caption');

bigPictureWindow.querySelector('.big-picture__cancel').addEventListener('click', closeBigPhotoModal);

// Скрываем блоки до следующей домашки (так написано в задании)
bigPictureSocial.querySelector('.social__comment-count').classList.add('hidden');
bigPictureSocial.querySelector('.social__comments-loader').classList.add('hidden');

function insertComments(comments) {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = '35';
    commentAvatar.height = '35';
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    newComment.append(commentAvatar, commentText);
    commentsFragment.append(newComment);
  });

  socialComments.append(commentsFragment);
}

function overlayClickHandler(evt) {
  const target = evt.target;
  if (!target.closest('.big-picture__preview')) {
    closeBigPhotoModal();
  }
}

bigPictureWindow.addEventListener('click', overlayClickHandler);

const escapeKeydownHandler = createEscapeKeydownHandler(closeBigPhotoModal);

function openBigPhotoModal() {
  document.addEventListener('keydown', escapeKeydownHandler);
  document.body.classList.add('modal-open');
  bigPictureWindow.classList.remove('hidden');
}

function closeBigPhotoModal() {
  document.removeEventListener('keydown', escapeKeydownHandler);
  bigPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function showBigPhotoModal(photoData) {
  bigPictureImage.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;

  socialComments.innerHTML = '';
  insertComments(photoData.comments);
  socialCaption.textContent = photoData.description;

  openBigPhotoModal();
}

export { showBigPhotoModal };
