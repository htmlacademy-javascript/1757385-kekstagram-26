const COMMENT_MAX_LENGTH = 140;
const DESCRIPTIONS_COUNT = 25;

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

checkMaxLength('Авада Кедавра', COMMENT_MAX_LENGTH); // Stub for linter

const IDS = [];
const URLS = [];
for(let i = 0; i < DESCRIPTIONS_COUNT; i++) {
  IDS[i] = URLS[i] = i + 1;
}

const DESCRIPTIONS = [
  'Парк в центре города с небольшим прудом',
  'Указатель к месту самой счастливой жизни',
  'Место где, побывав один раз, не сможешь жить как прежде',
  'Фотограф от бога',
  'Счастливы вместе',
  'Бэтмен курит в сторонке',
  'Твой завтрак на время сушки',
  'Там тебя не достанут',
  'Взошла Луна посреди блеклых звёзд',
  'Гиппопотам не устаит перед твоей непоколебимостью'
];

const UNIQUE_IDS = [];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Семён Семёныч',
  'Мишка Медвед',
  'Полуночный призрак',
  'Безымянный',
  'Человек Сергей',
  'Ахмед Абду Ахмед Амр Эль Усман',
  'Фредди',
  'Твентин Карантино',
  'Ольга Александровна',
  'Дима'
];

//It possibly unnecessary to generate random numbers in case of Id's and Url's
function createUniqueNumberFromArray(numbers) {
  const indexNumber = getPositiveRandomInt(0, numbers.length - 1);
  const result = numbers[indexNumber];
  numbers = numbers.splice(indexNumber, 1);
  return result;
}

//This function can have unpredictable random runtime
function createUniqueId(numbers) {
  let result = null;
  while(!numbers.includes(result)) {
    result = getPositiveRandomInt(1, 1000);
    numbers.push(result);
  }

  return result;
}

function getRandomValueFromArray(array) {
  return array[getPositiveRandomInt(0, array.length - 1)];
}

function createMessage() {
  const numMessages = getPositiveRandomInt(1, 2);
  const messages = [];
  for(let i = 0; i < numMessages; i++) {
    messages[i] = getRandomValueFromArray(MESSAGES);
  }

  return messages.join(' ');
}

function createComment() {
  return {
    id: createUniqueId(UNIQUE_IDS),
    avatar: `img/avatar-${getPositiveRandomInt(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomValueFromArray(NAMES)
  };
}

function createRandomComments() {
  const numComments = getPositiveRandomInt(1, 5);
  const comments = [];
  for(let i = 0; i < numComments; i++) {
    comments[i] = createComment();
  }

  return comments;
}

function createPhotoDescription() {
  return {
    id: createUniqueNumberFromArray(IDS),
    url: `photos/${createUniqueNumberFromArray(URLS)}.jpg`,
    description: getRandomValueFromArray(DESCRIPTIONS),
    likes: getPositiveRandomInt(15, 200),
    comments: createRandomComments()
  };
}

let descriptions = Array.from({length: DESCRIPTIONS_COUNT}, createPhotoDescription);
if(descriptions.length < 0) { // Stub for linter
  descriptions = null;
}
