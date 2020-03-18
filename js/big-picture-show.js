'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('#picture-cancel');
  var bigPicturePhoto = bigPicture
    .querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
  var commentCounter = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var socialFooterText = document.querySelector('.social__footer-text');

  var onSetupFormEscPress = function (evt) {
    if (evt.keyCode !== 27) {
      return;
    }

    if (document.activeElement === socialFooterText) {
      socialFooterText.blur();
    } else {
      socialFooterText.value = '';
      window.util.isEscEvent(evt, closeBigPicture);
    }
  };

  var closeBigPicture = function () {
    window.util.closeDomElement(bigPicture);
    window.util.makeBodyScrolled();
    document.removeEventListener('keydown', onSetupFormEscPress);
  };

  var createComment = function (comment) {
    var commentWrapper = document.createElement('li');
    var commentImg = document.createElement('img');
    var commentDescription = document.createElement('p');

    commentWrapper.className = 'social__comment';

    commentImg.className = 'social__picture';
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;

    commentDescription.className = 'social__text';
    commentDescription.textContent = comment.message;

    commentWrapper.appendChild(commentImg);
    commentWrapper.appendChild(commentDescription);

    return commentWrapper;
  };

  window.util.closeDomElement(commentCounter);
  window.util.closeDomElement(commentsLoader);
  window.openBigPicture = function () {
    window.util.showDomElement(bigPicture);
    window.util.makeBodyUnscrolled();
    document.addEventListener('keydown', onSetupFormEscPress);
  };

  window.showBigPicture = function (photo) {
    var fragment = document.createDocumentFragment();

    bigPicturePhoto.querySelector('img').src = photo.url;
    bigPictureSocial.querySelector('.likes-count').textContent = photo.likes;
    bigPictureSocial.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureSocial.querySelector('.social__caption').textContent = photo.description;
    bigPictureCommentsBlock.innerHTML = '';

    photo.comments.forEach(function (comment) {
      fragment.appendChild(createComment(comment));
    });

    bigPictureCommentsBlock.appendChild(fragment);
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });
})();
