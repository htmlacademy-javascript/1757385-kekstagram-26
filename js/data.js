import { getPositiveRandomInt, getRandomValueFromArray } from './utils.js';

const MAX_COMMENT_ID = 10e5;

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
  'Гиппопотам не устоит перед твоей непоколебимостью'
];

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

function SimpleCounter() {
  this.currentNumber = 1;
  this.getNextNumber = function () {
    return this.currentNumber++;
  };
}

function UniqueRandomNumbers() {
  this.numbers = [];
  this.getNumber = function () {
    let result = null;
    while(!this.numbers.includes(result)) {
      result = getPositiveRandomInt(1, MAX_COMMENT_ID);
      this.numbers.push(result);
    }

    return result;
  };
}

const ids = new SimpleCounter();
const urls = new SimpleCounter();
const randomIds = new UniqueRandomNumbers();

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
    id: randomIds.getNumber(),
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
    id: ids.getNextNumber(),
    url: `photos/${urls.getNextNumber()}.jpg`,
    description: getRandomValueFromArray(DESCRIPTIONS),
    likes: getPositiveRandomInt(15, 200),
    comments: createRandomComments()
  };
}

const createDescriptions = (number) => Array.from({length: number}, createPhotoDescription);

export { createDescriptions };
