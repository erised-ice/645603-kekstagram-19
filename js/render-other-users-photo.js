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
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', function () {
      window.openBigPicture();
      window.showBigPicture(photo);
    });

    return photoElement;
  };

  var renderPhotos = function (photosArray) {
    var fragment = document.createDocumentFragment();
    var pictures = otherUserPictures.querySelectorAll('.picture');

    if (pictures.length) {
      pictures.forEach(function (picture) {
        otherUserPictures.removeChild(picture);
      });
    }

    photosArray.forEach(function (photo) {
      fragment.appendChild(createPhoto(photo));
    });

    otherUserPictures.appendChild(fragment);
  };

  var successHandler = function (photosArray) {
    window.filterOtherUserPhotos(photosArray);

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

  window.renderPhotos = renderPhotos;
})();
