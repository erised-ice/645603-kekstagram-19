'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var photoSetupWindow = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var decreaseScaleControl = document.querySelector('.scale__control--smaller');
  var increaseScaleControl = document.querySelector('.scale__control--bigger');

  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successMessage = successMessageTemplate.cloneNode(true);

  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorMessage = errorMessageTemplate.cloneNode(true);

  var onSetupFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closePhotoSetupForm);
  };

  var openPhotoSetupForm = function () {
    window.util.showDomElement(photoSetupWindow);
    window.util.makeBodyUnscrolled();
    document.addEventListener('keydown', onSetupFormEscPress);
  };

  var cleanPhotoSetupForm = function () {
    var focusableFormElements = imgUploadForm.querySelectorAll('.text__hashtags, .text__description');

    focusableFormElements.forEach(function (item) {
      item.value = '';
    });

    window.scalePhoto.reset();
  };

  var closePhotoSetupForm = function () {
    cleanPhotoSetupForm();
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

  imgUploadForm.addEventListener('submit', function (submitEvt) {
    window.upload(new FormData(imgUploadForm), function () {
      closePhotoSetupForm();
      cleanPhotoSetupForm();
      window.renderSuccessMessage();
    });
    submitEvt.preventDefault();

    window.renderSuccessMessage = function () {
      var main = document.querySelector('main');
      var onSuccessMessageEscPress = function (successEscEvt) {
        window.util.isEscEvent(successEscEvt, closeSuccessMessage);
      };

      document.addEventListener('keydown', onSuccessMessageEscPress);
      document.addEventListener('click', function (successEvt) {
        if (successEvt.target !== successInner && successEvt.target.closest('.success__inner') === null) {
          closeSuccessMessage();
        }
      });
      var closeSuccessMessage = function () {
        if (main.querySelector('.success')) {
          main.removeChild(successMessage);
        }
      };
      document.addEventListener('keydown', onSetupFormEscPress);
      main.appendChild(successMessage);

      var successButton = document.querySelector('.success__button');
      var successInner = document.querySelector('.success__inner');

      successButton.addEventListener('click', function () {
        document.removeEventListener('keydown', onSuccessMessageEscPress);
        closeSuccessMessage();
      });
    };

    window.renderErrorMessage = function () {
      var main = document.querySelector('main');
      var onErrorMessageEscPress = function (evt) {
        window.util.isEscEvent(evt, closeErrorMessage);
      };

      document.addEventListener('keydown', onErrorMessageEscPress);
      document.addEventListener('click', function (errorEvt) {
        if (errorEvt.target !== errorInner && errorEvt.target.closest('.error__inner') === null) {
          closeErrorMessage();
        }
      });


      var closeErrorMessage = function () {
        main.removeChild(errorMessage);
      };

      main.appendChild(errorMessage);

      var errorButton = document.querySelector('.error__button');
      var errorInner = document.querySelector('.error__inner');

      errorButton.addEventListener('click', function () {
        document.removeEventListener('keydown', onErrorMessageEscPress);
        closeErrorMessage();
      });

      closePhotoSetupForm();
    };
  });

  decreaseScaleControl.addEventListener('click', window.scalePhoto.decrease);
  increaseScaleControl.addEventListener('click', window.scalePhoto.increase);
})();
