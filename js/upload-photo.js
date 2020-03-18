'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var photoSetupWindow = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var onSetupFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closePhotoSetupForm);
  };

  var openPhotoSetupForm = function () {
    window.util.showDomElement(photoSetupWindow);
    window.util.makeBodyUnscrolled();
    document.addEventListener('keydown', onSetupFormEscPress);
  };

  var closePhotoSetupForm = function () {
    uploadFile.value = '';
    document.removeEventListener('keydown', onSetupFormEscPress);
    window.util.makeBodyScrolled();
    window.util.closeDomElement(photoSetupWindow);
  };

  uploadFile.addEventListener('change', function () {
    openPhotoSetupForm();
  });

  uploadCancel.addEventListener('click', function () {
    closePhotoSetupForm();
  });

  imgUploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(imgUploadForm), function () {
      closePhotoSetupForm();
    });
    evt.preventDefault();
  });
})();
