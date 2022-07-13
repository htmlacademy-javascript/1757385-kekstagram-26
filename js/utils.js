const ALERT_SHOW_TIME = 5000;
const ALERT_SHOW_DELAY = 300;
const ALERT_HIDE_DELAY = 400;

function getPositiveRandomInt(min, max) {
  min = min < 0 ? 0 : Math.ceil(min);
  max = max < 0 ? 0 : Math.floor(max);
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  if(lower === upper) {
    return upper;
  }

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

const checkMaxLength = (checkedString, maxLength) => checkedString.length <= maxLength;

function getRandomValueFromArray(array) {
  return array[getPositiveRandomInt(0, array.length - 1)];
}

const isEscapeKey = (evt) => evt.key === 'Escape';

function createEscapeKeydownHandler(cb) {
  return function (evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      cb();
    }
  };
}

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '25%';
  alertContainer.style.top = '0';
  alertContainer.style.right = '25%';
  alertContainer.style.transition = 'transform 0.4s ease-out';
  alertContainer.style.transform = 'translate3D(0, -100%, 0)';
  alertContainer.style.padding = '25px 10px';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.textTransform = 'none';
  alertContainer.style.color = 'tomato';
  alertContainer.style.backgroundColor = '#3c3614';
  alertContainer.style.border = '4px solid white';
  alertContainer.style.borderTop = '0';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.style.transform = 'translate3D(0, 0, 0)';
  }, ALERT_SHOW_DELAY);

  setTimeout(() => {
    alertContainer.style.transform = 'translate3D(0, -100%, 0)';
  }, ALERT_SHOW_TIME);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME + ALERT_SHOW_DELAY + ALERT_HIDE_DELAY);
}

function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getPositiveRandomInt, getRandomValueFromArray, checkMaxLength, createEscapeKeydownHandler, showAlert, debounce };
