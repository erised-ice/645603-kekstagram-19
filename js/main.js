'use strict';

// Константы

var PHOTOS_AMOUNT = 25;

var DESCRIPTIONS_ARRAY = [
  'иберийский ирис',
  'ивановские иглы',
  'ивовый ил',
  'иглобрюх',
  'игрушечный инопланетянин',
  'Интересный инструмент',
  'Идеальный игрок',
  'Индивидуальный итог',
  'идиоматический индюк'
];

var MESSAGES_ARRAY = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES_ARRAY = ['Иван', 'Ирина', 'Игорь', 'Инга', 'Илларион', 'Инна', 'Ингрид'];

// Селекторы
var otherUserPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функции

var getRandomInteger = function (min, max) {
  var randomValue = min + Math.random() * (max + 1 - min);
  return Math.floor(randomValue);
};

var getRandomArrayItem = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var createNumberArray = function (maxNumber) {
  var numberArray = [];

  for (var i = 0; i < maxNumber; i++) {
    numberArray[i] = i + 1;
  }

  return numberArray;
};

var createMessage = function (messagesArray) {
  var message = '';
  var messageLength = getRandomInteger(1, 2);

  if (messageLength === 1) {
    message = getRandomArrayItem(messagesArray);
  } message = getRandomArrayItem(messagesArray) + '' + getRandomArrayItem(messagesArray);

  return message;
};

var createCommentsArray = function (messages, names, arrayLength) {
  var commentsArray = [];

  for (var i = 0; i < arrayLength; i++) {
    commentsArray[i] = {
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: createMessage(messages),
      name: getRandomArrayItem(names)
    };
  }

  return commentsArray;
};

var createPhotoArray = function (descriptions, messages, names) {
  var photoArray = [];

  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    var comments = createCommentsArray(messages, names, getRandomInteger(0, 10));

    photoArray[i] = {
      url: 'photos/' + i + '.jpg',
      description: getRandomArrayItem(descriptions),
      likes: getRandomInteger(15, 200),
      comments: comments.length
    };
  }

  return photoArray;
};

var createPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = getRandomInteger(1, 10);

  return photoElement;
};

var renderPhotos = function (photosArray, container) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosArray.length; i++) {
    fragment.appendChild(createPhoto(photosArray[i]));
  }

  container.appendChild(fragment);
};

// Вызовы функций

var photosArray = createPhotoArray(DESCRIPTIONS_ARRAY, MESSAGES_ARRAY, NAMES_ARRAY);

renderPhotos(photosArray, otherUserPictures);
