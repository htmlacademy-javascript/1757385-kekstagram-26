const COMMENT_MAX_LENGTH = 140;

function getRandomInt(min, max) {
  min = min < 0 ? 0 : Math.ceil(min);
  max = Math.floor(max);

  if(max < min) {
    return -1;
  }

  if(max === min) {
    return max;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const checkMaxLength = (checkedString, maxLength) => checkedString.length <= maxLength;

getRandomInt(-5, 5.6);
checkMaxLength('Авада Кедавра', COMMENT_MAX_LENGTH);
