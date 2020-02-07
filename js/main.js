'use strict';

// Константы

var PHOTOS_AMOUNT = 25;
var MESSAGES_ARRAY = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES_ARRAY = ['Иван', 'Ирина', 'Игорь', 'Инга', 'Илларион', 'Инна', 'Ингрид'];

// Селекторы

// Функции

var getRandomInteger = function (min, max) {
  var randomValue = min + Math.random() * (max + 1 - min);
  return Math.floor(randomValue);
};

var getRandomArrayItem = function (array) {
  return array[getRandomInteger(1, array.length)];
};

var createCommentsArray = function (messages, names) {
  var commentsArray = [];

  for (var i = 0; i < 10; i++) {
    commentsArray[i] = {
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: getRandomArrayItem(messages),
      name: getRandomArrayItem(names)
    };
  }

  return commentsArray;
};

var createPhotoArray = function (comments) {
  var photoArray = [];

  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    photoArray[i] = {
      url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
      description: 'описание фотографии',
      likes: getRandomInteger(15, 200),
      comments: getRandomArrayItem(comments)
    };
  }

  return photoArray;
};

// Вызовы функций

var commentsArray = createCommentsArray(MESSAGES_ARRAY, NAMES_ARRAY);

console.log(createCommentsArray(MESSAGES_ARRAY, NAMES_ARRAY));

console.log(createPhotoArray(commentsArray));
