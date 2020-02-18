'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var photoSetupWindow = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');

  var makeBodyUnscrolled = function () {
    window.util.BODY.classList.add('modal-open');
  };

  var makeBodyScrolled = function () {
    window.util.BODY.classList.remove('modal-open');
  };

  var onSetupFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closePhotoSetupForm);
  };

  var openPhotoSetupForm = function () {
    window.util.showDomElement(photoSetupWindow);
    makeBodyUnscrolled();
    document.addEventListener('keydown', onSetupFormEscPress);
  };

  var closePhotoSetupForm = function () {
    window.util.closeDomElement(photoSetupWindow);
    makeBodyScrolled();
    document.removeEventListener('keydown', onSetupFormEscPress);
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    openPhotoSetupForm();
  });

  uploadCancel.addEventListener('click', function () {
    closePhotoSetupForm();
  });
})();
