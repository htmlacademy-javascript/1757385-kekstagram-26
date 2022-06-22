const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureImage = bigPictureWindow.querySelector('.big-picture__img').querySelector('img');
const bigPictureSocial = bigPictureWindow.querySelector('.big-picture__social');
const likesCount = bigPictureSocial.querySelector('.social__likes').querySelector('.likes-count');
const commentsCount = bigPictureSocial.querySelector('.comments-count');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialCaption = bigPictureSocial.querySelector('.social__caption');

//Comment till the next homework
bigPictureSocial.querySelector('.social__comment-count').classList.add('hidden');
bigPictureSocial.querySelector('.social__comments-loader').classList.add('hidden');

function insertComments(comments) {
  let commentList = socialComments.querySelectorAll('.social__comment');

  commentList.forEach((commentListItem) => {
    const isNecessary = comments.some((comment) =>
      commentListItem.querySelector('.social__picture').src === comment.avatar
      && commentListItem.querySelector('.social__text').textContent === comment.message
    );

    if (!isNecessary) {
      commentListItem.remove();
    }
  });

  const commentsFragment = document.createDocumentFragment();
  commentList = socialComments.querySelectorAll('.social__comment');
  comments.forEach((comment) => {
    let isPublished = false;
    for(const commentListItem of commentList) {
      if (commentListItem.querySelector('.social__picture').src === comment.avatar
      && commentListItem.querySelector('.social__text').textContent === comment.message) {
        isPublished = true;
        break;
      }
    }

    if (!isPublished) {
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
    }
  });

  socialComments.append(commentsFragment);
}

function escapeButtonHandler(evt) {
  if(evt.key === 'Escape') {
    closeBigPictureModal();
  }
}

function openBigPictureModal() {
  bigPictureWindow.querySelector('.big-picture__cancel').addEventListener('click', closeBigPictureModal);
  document.body.addEventListener('keyup', escapeButtonHandler);
  document.body.classList.add('modal-open');
  bigPictureWindow.classList.remove('hidden');
}

function closeBigPictureModal() {
  document.body.removeEventListener('keyup', escapeButtonHandler);
  bigPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function showBigPicture(pictureData) {
  bigPictureImage.src = pictureData.url;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;

  insertComments(pictureData.comments);
  socialCaption.textContent = pictureData.description;

  openBigPictureModal();
}

export { showBigPicture };
