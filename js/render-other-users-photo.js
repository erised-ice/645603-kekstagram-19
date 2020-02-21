'use strict';

(function () {
  var otherUserPictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var createPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = window.util.getRandomInteger(1, 10);

    return photoElement;
  };

  var successHandler = function (photosArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      fragment.appendChild(createPhoto(photosArray[i]));
    }

    otherUserPictures.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow; color: red; font-weight: bold; letter-spacing: 1px;';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '15px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();
