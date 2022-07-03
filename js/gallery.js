import { createEscapeKeydownHandler } from './utils.js';
import { COMMENT_PARTITION_SIZE } from './setup.js';

const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureImage = bigPictureWindow.querySelector('.big-picture__img').querySelector('img');
const bigPictureSocial = bigPictureWindow.querySelector('.big-picture__social');
const likesCount = bigPictureSocial.querySelector('.social__likes').querySelector('.likes-count');
const commentsCount = bigPictureSocial.querySelector('.comments-count');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const commentsLoader = bigPictureSocial.querySelector('.social__comments-loader');

function CommentsController(loaderButton, outputNode, commentCountNode, commentTotalNode) {
  let loadedCommentsNumber = 0;
  let comments = [];

  this.setComments = function(newComments) {
    comments = newComments;
    commentTotalNode.textContent = comments.length;
    loadedCommentsNumber = 0;
    loadedCommentsNumber = insertComments(loadedCommentsNumber, COMMENT_PARTITION_SIZE);
  };
  this.clear = function() {
    comments = [];
    outputNode.innerHTML = '';
    showLoaderButton();
  };

  function insertComments(from = 0, limit = Infinity) {
    const commentsFragment = document.createDocumentFragment();
    let i = from;
    for(; i < limit + from && i < comments.length; i++) {
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      const commentAvatar = document.createElement('img');
      commentAvatar.classList.add('social__picture');
      commentAvatar.src = comments[i].avatar;
      commentAvatar.alt = comments[i].name;
      commentAvatar.width = '35';
      commentAvatar.height = '35';
      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = comments[i].message;
      newComment.append(commentAvatar, commentText);
      commentsFragment.append(newComment);
    }
    outputNode.append(commentsFragment);
    commentCountNode.childNodes[0].textContent = `${i} из `;

    if(i === comments.length) {
      hideLoaderButton();
    }

    return i;
  }

  function hideLoaderButton () {
    loaderButton.style.display = 'none';
  }

  function showLoaderButton () {
    loaderButton.style.display = '';
  }

  loaderButton.addEventListener('click', () => {
    loadedCommentsNumber = insertComments(loadedCommentsNumber, COMMENT_PARTITION_SIZE);
  });
}

const commentsController = new CommentsController(commentsLoader, socialComments, socialCommentCount, commentsCount);

function overlayClickHandler(evt) {
  const target = evt.target;
  if (!target.closest('.big-picture__preview')) {
    closeBigPhotoModal();
  }
}

bigPictureWindow.querySelector('.big-picture__cancel').addEventListener('click', closeBigPhotoModal);
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

  commentsController.clear();
  commentsController.setComments(photoData.comments);
  socialCaption.textContent = photoData.description;

  openBigPhotoModal();
}

export { showBigPhotoModal };
