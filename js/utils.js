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

export { getPositiveRandomInt, getRandomValueFromArray, checkMaxLength };
