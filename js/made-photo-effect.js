'use strict';

(function () {
  var EFFECT_LEVEL_PIN = document.querySelector('.effect-level__pin');
  var EFFECT_LEVEL_DEPTH = document.querySelector('.effect-level__depth');
  var EFFECT_LEVEL_VALUE = document.querySelector('.effect-level__value');
  var EFFECTS_RADIO_COLLECTION = document.querySelectorAll('.effects__radio');
  var photo = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.effect-level');

  window.editPhoto = {
    EFFECT_LEVEL_PIN: EFFECT_LEVEL_PIN,
    EFFECT_LEVEL_DEPTH: EFFECT_LEVEL_DEPTH,
    EFFECT_LEVEL_VALUE: EFFECT_LEVEL_VALUE,

    moveLevelPin: function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var effectLevelPinMiddle = EFFECT_LEVEL_PIN.offsetWidth / 2;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (EFFECT_LEVEL_PIN.offsetLeft <= 0) {
          EFFECT_LEVEL_PIN.style.left = '0px';
        }

        if (EFFECT_LEVEL_PIN.offsetLeft >= 455) {
          EFFECT_LEVEL_PIN.style.left = '455px';
        }

        EFFECT_LEVEL_PIN.style.left = (EFFECT_LEVEL_PIN.offsetLeft - shift.x) + 'px';
        EFFECT_LEVEL_VALUE.value = Math.round((EFFECT_LEVEL_PIN.offsetLeft + effectLevelPinMiddle - shift.x) / 455 * 100);

        if (EFFECT_LEVEL_VALUE.value >= 100) {
          EFFECT_LEVEL_VALUE.value = 100;
        }

        if (EFFECT_LEVEL_VALUE.value <= 0) {
          EFFECT_LEVEL_VALUE.value = 0;
        }

        EFFECT_LEVEL_DEPTH.style.width = EFFECT_LEVEL_VALUE.value + '%';
        window.editPhoto.changeImgFilterLevel(EFFECT_LEVEL_VALUE.value);

        if (startCoords.y < 620 || startCoords.y > 650 || EFFECT_LEVEL_PIN.offsetLeft > 460 || EFFECT_LEVEL_PIN.offsetLeft < -5) {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    changeImgFilter: function (evt) {
      var radioButtonValue = evt.target.value;

      photo.className = '';
      photo.classList.add('effects__preview--' + radioButtonValue);
      window.editPhoto.changeImgFilterLevel(100);
      window.editPhoto.reset();
      slider.style.display = radioButtonValue === 'none' ? 'none' : 'block';
    },
    changeImgFilterLevel: function (value) {
      switch (photo.className) {
        case 'effects__preview--chrome':
          photo.style.filter = 'grayscale(' + (value / 100) + ')';
          break;
        case 'effects__preview--sepia':
          photo.style.filter = 'sepia(' + (value / 100) + ')';
          break;
        case 'effects__preview--marvin':
          photo.style.filter = 'invert(' + value + '%)';
          break;
        case 'effects__preview--phobos':
          photo.style.filter = 'blur(' + (value * 3) / 100 + 'px)';
          break;
        case 'effects__preview--heat':
          photo.style.filter = 'brightness(' + ((value * 2) / 100 + 1) + ')';
          break;
        case 'effects__preview--none':
        default:
          photo.removeAttribute('style');
      }
    },
    reset: function () {
      EFFECT_LEVEL_PIN.style.left = '100%';
      EFFECT_LEVEL_VALUE.value = 100;
      EFFECT_LEVEL_DEPTH.style.width = '100%';
    }
  };

  EFFECTS_RADIO_COLLECTION.forEach(function (radioButton) {
    radioButton.addEventListener('change', window.editPhoto.changeImgFilter);
  });
})();
