'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPicturePhoto = bigPicture
    .querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
  var bigPictureComments = bigPicture.querySelectorAll('.social__comment');
  var commentCounter = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  window.openBigPicture = function () {
    window.util.showDomElement(bigPicture);
    window.util.BODY.classList.add('modal-open');
  };
  var createComment = function (comment) {
    var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment['avatar'];
    commentElement.querySelector('.social__picture').alt = comment['name'];
    commentElement.querySelector('.social__text').textContent = comment['message'];

    return commentElement;
  };

  window.util.closeDomElement(commentCounter);
  window.util.closeDomElement(commentsLoader);

  window.showBigPicture = function (photosArray) {
    bigPicturePhoto.querySelector('img').src = photosArray[0].url;
    bigPictureSocial.querySelector('.likes-count').textContent = photosArray[0].likes;
    bigPictureSocial.querySelector('.comments-count').textContent = photosArray[0].comments.length;
    bigPictureSocial.querySelector('.social__caption').textContent = photosArray[0].description;

    photosArray[0].comments.forEach(function (comment) {
      bigPictureCommentsBlock.appendChild(createComment(comment));
    });

    if (bigPictureComments.length) {
      bigPictureComments.forEach(function (comment) {
        bigPictureCommentsBlock.removeChild(comment);
      });
    }
  };
})();
