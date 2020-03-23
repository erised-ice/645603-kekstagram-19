'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFile = document.querySelector('#upload-file');
  var photoSetupWindow = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var decreaseScaleControl = document.querySelector('.scale__control--smaller');
  var increaseScaleControl = document.querySelector('.scale__control--bigger');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var focusableFormElements = imgUploadForm.querySelectorAll('.text__hashtags, .text__description');

  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successMessage = successMessageTemplate.cloneNode(true);

  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorMessage = errorMessageTemplate.cloneNode(true);

  var keydownHandler = function (evt) {
    var focusable = Array.from(focusableFormElements)
      .find(function (item) {
        return item === document.activeElement;
      });

    window.util.isEscEvent(evt, closePhotoSetupForm, focusable);
  };

  var openPhotoSetupForm = function () {
    window.util.showDomElement(photoSetupWindow);
    window.util.makeBodyUnscrolled();
    document.addEventListener('keydown', keydownHandler);
    window.editPhoto.EFFECTS_RADIO_DEFAULT.checked = true;
    window.editPhoto.reset();
  };

  var cleanPhotoSetupForm = function () {
    focusableFormElements.forEach(function (item) {
      item.value = '';
    });

    document.querySelector('.effect-level__value').value = 20;
    window.scalePhoto.reset();
    window.editPhoto.reset();
  };

  var closePhotoSetupForm = function () {
    cleanPhotoSetupForm();
    document.removeEventListener('keydown', keydownHandler);
    window.util.makeBodyScrolled();
    window.util.closeDomElement(photoSetupWindow);
  };

  uploadFile.addEventListener('change', function () {
    openPhotoSetupForm();
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.scalePhoto.PHOTO.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
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
      document.addEventListener('keydown', keydownHandler);
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
  effectLevelPin.addEventListener('mousedown', window.editPhoto.moveLevelPin);
})();
