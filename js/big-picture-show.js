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
  var openedPhoto = null;

  var onSetupFormEscPress = function (evt) {
    if (evt.keyCode !== 27) {
      return;
    }

    if (document.activeElement === socialFooterText) {
      socialFooterText.blur();
    } else {
      window.util.isEscEvent(evt, closeBigPicture);
    }
  };

  var closeBigPicture = function () {
    socialFooterText.value = '';
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

  var renderPhoto = function (photo) {
    var comments = photo.comments;

    bigPicturePhoto.querySelector('img').src = photo.url;
    bigPictureSocial.querySelector('.likes-count').textContent = photo.likes;
    bigPictureSocial.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureSocial.querySelector('.social__caption').textContent = photo.description;
    bigPictureCommentsBlock.innerHTML = '';

    if (comments.length > 5) {
      window.util.showDomElement(commentCounter);
      window.util.showDomElement(commentsLoader);
    } else {
      window.util.closeDomElement(commentCounter);
      window.util.closeDomElement(commentsLoader);
    }
  };

  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(createComment(comments[i]));
    }

    bigPictureCommentsBlock.appendChild(fragment);
  };

  window.showBigPicture = function (photo) {
    window.util.showDomElement(bigPicture);
    window.util.makeBodyUnscrolled();
    document.addEventListener('keydown', onSetupFormEscPress);

    var commentsForRender = photo.comments.length <= 5
      ? photo.comments
      : photo.comments.filter(function (_, index) {
        return index < 5;
      });

    renderPhoto(photo);
    renderComments(commentsForRender);

    openedPhoto = photo;
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  commentsLoader.addEventListener('click', function () {
    var renderedElementsLength = bigPictureCommentsBlock
      .querySelectorAll('.social__comment')
      .length;

    var additionalCommentsForRender = openedPhoto.comments.filter(
        function (_, index) {
          return index >= renderedElementsLength
            && index < renderedElementsLength + 5;
        });

    renderComments(additionalCommentsForRender);

    if (openedPhoto.comments.length <= bigPictureCommentsBlock
      .querySelectorAll('.social__comment')
      .length) {
      window.util.closeDomElement(commentCounter);
      window.util.closeDomElement(commentsLoader);
    }
  });
})();
