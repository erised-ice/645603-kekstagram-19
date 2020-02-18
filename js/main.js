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
var ESC_KEY = 'Escape';
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENTGH = 20;
var MAX_HASHTAGS_COUNT = 5;

// Селекторы
var body = document.querySelector('body');
var otherUserPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var uploadFile = document.querySelector('#upload-file');
var photoSetupWindow = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');
var hashtagsInput = document.querySelector('.text__hashtags');

// Функции

var showDomElement = function (element) {
  element.classList.remove('hidden');
};

var closeDomeElement = function (element) {
  element.classList.add('hidden');
};

var makeBodyUnscrolled = function () {
  body.classList.add('modal-open');
};

var makeBodyScrolled = function () {
  body.classList.remove('modal-open');
};

var onSetupFormEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePhotoSetupForm();
    document.removeEventListener('keydown', onSetupFormEscPress);
  }
};

var openPhotoSetupForm = function () {
  showDomElement(photoSetupWindow);
  makeBodyUnscrolled();
  document.addEventListener('keydown', onSetupFormEscPress);
};

var closePhotoSetupForm = function () {
  closeDomeElement(photoSetupWindow);
  makeBodyScrolled();
  document.removeEventListener('keydown', onSetupFormEscPress);
  uploadFile.value = '';
};

var getRandomInteger = function (min, max) {
  var randomValue = min + Math.random() * (max + 1 - min);
  return Math.floor(randomValue);
};

var getRandomArrayItem = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var createMessage = function (messagesArray) {
  var message = '';
  var messageLength = getRandomInteger(1, 2);

  if (messageLength === 1) {
    message = getRandomArrayItem(messagesArray);
  } else {
    message = getRandomArrayItem(messagesArray) + '' + getRandomArrayItem(messagesArray);
  }

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
      url: 'photos/' + (i + 1) + '.jpg',
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

var isUniqueArray = function (array) {
  var uniqueObject = {};

  for (var i = 0; i < array.length; i++) {
    var current = array[i];
    if (uniqueObject[current]) {
      return false;
    }
    uniqueObject[current] = true;
  }
  return true;
};

var isContainSymbols = function (word) {
  return word.match(/^#[a-zA-Z0-9а-яА-Я]+$/);
};

// Вызовы функций

var photosArray = createPhotoArray(DESCRIPTIONS_ARRAY, MESSAGES_ARRAY, NAMES_ARRAY);

renderPhotos(photosArray, otherUserPictures);

uploadFile.addEventListener('change', function () {
  openPhotoSetupForm();
});

uploadCancel.addEventListener('click', function () {
  closePhotoSetupForm();
});

effectLevelPin.addEventListener('mouseup', function () {
  effectLevelValue.value = 0.5;
});

hashtagsInput.addEventListener('input', function () {
  var hashtagsLowCase = hashtagsInput.value.toLowerCase();
  var hashtagsArray = hashtagsLowCase.split(' ');

  if (hashtagsArray.length > MAX_HASHTAGS_COUNT) {
    hashtagsInput.setCustomValidity('Нельзя указать больше ' + MAX_HASHTAGS_COUNT + ' хэш-тегов');
  } else {
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (!isUniqueArray(hashtagsArray)) {
        hashtagsInput.setCustomValidity('хэш-теги не должны повторяться');
      } else if (hashtagsArray[i][0] !== '#') {
        hashtagsInput.setCustomValidity('хэш-тег должен начинаться с символа #');
      } else if (hashtagsArray[i].length < MIN_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (hashtagsArray[i].length > MAX_HASHTAG_LENTGH) {
        hashtagsInput.setCustomValidity('максимальная длина одного хэш-тега ' + MAX_HASHTAG_LENTGH + ' символов, включая решётку');
      } else if (!isContainSymbols(hashtagsArray[i])) {
        hashtagsInput.setCustomValidity('Должен начинаться с решетки и состоять только из букв и цифр');
      } else {
        hashtagsInput.setCustomValidity('');
      }
    }
  }
});
