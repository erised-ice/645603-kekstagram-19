'use strict';

(function () {
  var otherUserPictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var createMessage = function (messagesArray) {
    var message = '';
    var messageLength = window.util.getRandomInteger(1, 2);

    if (messageLength === 1) {
      message = window.util.getRandomArrayItem(messagesArray);
    } else {
      message = window.util.getRandomArrayItem(messagesArray) + '' + window.util.getRandomArrayItem(messagesArray);
    }

    return message;
  };

  var createCommentsArray = function (messages, names, arrayLength) {
    var commentsArray = [];

    for (var i = 0; i < arrayLength; i++) {
      commentsArray[i] = {
        avatar: 'img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg',
        message: createMessage(messages),
        name: window.util.getRandomArrayItem(names)
      };
    }

    return commentsArray;
  };

  var createPhotoArray = function (descriptions, messages, names) {
    var photoArray = [];

    for (var i = 0; i < window.data.PHOTOS_AMOUNT; i++) {
      var comments = createCommentsArray(messages, names, window.util.getRandomInteger(0, 10));

      photoArray[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: window.util.getRandomArrayItem(descriptions),
        likes: window.util.getRandomInteger(15, 200),
        comments: comments.length
      };
    }

    return photoArray;
  };

  var createPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = window.util.getRandomInteger(1, 10);

    return photoElement;
  };

  var renderPhotos = function (photosArray, container) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(createPhoto(photosArray[i]));
    }

    container.appendChild(fragment);
  };

  var photosArray = createPhotoArray(window.data.DESCRIPTIONS_ARRAY, window.data.MESSAGES_ARRAY, window.data.NAMES_ARRAY);

  renderPhotos(photosArray, otherUserPictures);
})();
