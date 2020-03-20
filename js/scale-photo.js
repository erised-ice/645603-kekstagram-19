'use strict';

(function () {
  var SCALE = document.querySelector('.scale__control--value');
  var PHOTO = document.querySelector('.img-upload__preview img');
  var scaleStep = 25;
  var scaleValue = parseInt(SCALE.value, 10);
  var scaleTransformValue = function (value) {
    return value / 100;
  };

  window.scalePhoto = {
    SCALE: SCALE,
    PHOTO: PHOTO,
    decrease: function () {
      if (scaleValue > 25) {
        scaleValue -= scaleStep;
        SCALE.value = scaleValue + '%';
        PHOTO.style.transform = 'scale(' + scaleTransformValue(scaleValue) + ')';
      }
    },
    increase: function () {
      if (scaleValue < 100) {
        scaleValue += scaleStep;
        SCALE.value = scaleValue + '%';
        PHOTO.style.transform = 'scale(' + scaleTransformValue(scaleValue) + ')';
      }
    },
    reset: function () {
      SCALE.value = '100%';
      PHOTO.style.transform = 'scale(1)';
      scaleValue = 100;
    }
  };
})();
