import { createEscapeKeydownHandler, checkMaxLength } from './utils.js';
import { COMMENT_MAX_LENGTH, HASHTAGS_MAX_NUMBER, IMAGE_SCALE_STEP } from './setup.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const textDescriptionElement = imageUploadForm.querySelector('.text__description');
const scaleImageElement = imageUploadForm.querySelector('.img-upload__scale');
const scaleValueControl = scaleImageElement.querySelector('.scale__control--value');
const previewImageElement = imageUploadForm.querySelector('.img-upload__preview').querySelector('img');
const effectsListElement = imageUploadForm.querySelector('.effects__list');
const effectLevelElement = imageUploadForm.querySelector('.effect-level__slider');
const effectValueInputElement = imageUploadForm.querySelector('.effect-level__value');

//Открытие/закрытие формы
const escapeKeydownHandler = createEscapeKeydownHandler(escapeKeydownCallback);

textDescriptionElement.addEventListener('keydown', (evt) => evt.stopPropagation());
hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());

function escapeKeydownCallback() {
  imageUploadForm.reset();
  closeImageUploadModal();
}

function openImageUploadModal() {
  document.addEventListener('keydown', escapeKeydownHandler);
  scaleImageElement.addEventListener('click', scaleChangeHandler);
  effectsListElement.addEventListener('click', effectChangeHandler);
  hideSlider();
  imageUploadOverlay.classList.remove('hidden');
  scaleValueControl.value = '100%';
  previewImageElement.style = '';
  document.body.classList.add('modal-open');
}

function closeImageUploadModal() {
  document.removeEventListener('keydown', escapeKeydownHandler);
  scaleImageElement.removeEventListener('click', scaleChangeHandler);
  effectsListElement.removeEventListener('click', effectChangeHandler);
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
pristine.addValidator(textDescriptionElement, validateCommentLength, getCommentLengthErrorMessage);

//Отправка формы
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    closeImageUploadModal();
    imageUploadForm.submit();
  }
});

// Масштабирование изображения
function updateScaleImage(step) {
  let scale = parseInt(scaleValueControl.value, 10);
  scale += step;

  //Этот тип проверки на выход из диапазона необходим для шагов масштабирования, не кратных 25
  scale = scale > 100 ? 100 : scale;
  scale = scale < 25 ? 25 : scale;

  previewImageElement.style.transform = `scale(${scale}%)`;
  scaleValueControl.value = `${scale}%`;
}

function scaleChangeHandler(evt) {
  if(evt.target.matches('.scale__control--bigger')) {
    updateScaleImage(IMAGE_SCALE_STEP);
  } else if(evt.target.matches('.scale__control--smaller')) {
    updateScaleImage(-IMAGE_SCALE_STEP);
  }
}

// Эффекты на изображении
const effects = {
  none: {
    effectName: '',
    unit: '',
    options: {}
  },
  chrome: {
    effectName: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1
    }
  },
  sepia: {
    effectName: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1
    }
  },
  marvin: {
    effectName: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100
      },
      step: 1,
      start: 100
    }
  },
  phobos: {
    effectName: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3
      },
      step: 0.1,
      start: 3
    }
  },
  heat: {
    effectName: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3
      },
      step: 0.1,
      start: 3
    }
  }
};

let currentEffect = 'none';

function effectChangeHandler(evt) {
  if(evt.target.matches('[name="effect"]')) {
    previewImageElement.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = evt.target.id.substring(evt.target.id.indexOf('-') + 1);
    if(currentEffect !== 'none') {
      effectLevelElement.noUiSlider.updateOptions(effects[currentEffect].options);
      previewImageElement.classList.add(`effects__preview--${currentEffect}`);
      showSlider();
    } else {
      hideSlider();
      setEffectValue('none', 0);
    }
  }
}

noUiSlider.create(effectLevelElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function(value) {
      if(currentEffect === 'none') {
        return 0;
      }

      value = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
      return value + effects[currentEffect].unit;
    },
    from: function (value) {
      return value;
    }
  }
});

effectLevelElement.noUiSlider.on('update', () => {
  setEffectValue(currentEffect, effectLevelElement.noUiSlider.get());
});

function setEffectValue(effectKey, value) {
  if(effectKey !== 'none') {
    previewImageElement.style.filter = `${effects[effectKey].effectName}(${value})`;
  } else {
    previewImageElement.style.filter = '';
  }

  effectValueInputElement.value = parseFloat(value);
}

function hideSlider() {
  imageUploadForm.querySelector('.img-upload__effect-level').style.display = 'none';
}

function showSlider() {
  imageUploadForm.querySelector('.img-upload__effect-level').style.display = '';
}
