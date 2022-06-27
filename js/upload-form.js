import { createEscapeKeydownHandler, checkMaxLength } from './utils.js';
import { COMMENT_MAX_LENGTH, HASHTAGS_MAX_NUMBER } from './setup.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');

//Открытие/закрытие формы
const escapeKeydownHandler = createEscapeKeydownHandler(escapeKeydownCallback);

textDescription.addEventListener('keydown', (evt) => evt.stopPropagation());
hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());

function escapeKeydownCallback() {
  imageUploadForm.reset();
  closeImageUploadModal();
}

function openImageUploadModal() {
  document.addEventListener('keydown', escapeKeydownHandler);
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeImageUploadModal() {
  document.removeEventListener('keydown', escapeKeydownHandler);
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

imageUploadInput.addEventListener('change', openImageUploadModal);
imageUploadCancelButton.addEventListener('click', closeImageUploadModal);

// Валидация формы
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const hashtagErrorCodes = {
  'wrongFormat': 'Неверный формат хэш-тега',
  'doubling': 'Дублирование хэш-тегов непозволительно, сэр!',
  'maxAmount': 'Превышено максимально допустимое количество хэштегов'
};

let hashtagErrorCode = '0';

function validateHashtags(value) {
  if(value.length === 0) {
    return true;
  }
  const hashtags = value.trimEnd().split(/\s+/);
  const testExpression = /^#[a-zа-яё0-9]{1,19}$/i;

  //Максимальное количество хэш-тегов
  if(hashtags.length > HASHTAGS_MAX_NUMBER) {
    hashtagErrorCode = 'maxAmount';
    return false;
  }

  //Проверка на формат хэштега
  if(!hashtags.every((hashtag) => testExpression.test(hashtag))) {
    hashtagErrorCode = 'wrongFormat';
    return false;
  }

  //Проверка на дубликаты
  if(hashtags.length !== (new Set(hashtags)).size) {
    hashtagErrorCode = 'doubling';
    return false;
  }

  return true;
}

function getHashtagsValidationMessage() {
  return hashtagErrorCodes[hashtagErrorCode];
}

function validateCommentLength(value) {
  return checkMaxLength(value, COMMENT_MAX_LENGTH);
}

function getCommentLengthErrorMessage() {
  return `Максимальная длина комментария - ${COMMENT_MAX_LENGTH} символов`;
}

pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsValidationMessage);
pristine.addValidator(textDescription, validateCommentLength, getCommentLengthErrorMessage);

//Отправка формы
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    closeImageUploadModal();
    imageUploadForm.submit();
  }
});


