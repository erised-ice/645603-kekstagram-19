'use strict';

(function () {
  var SCALE = document.querySelector('.scale__control--value');
  var scaleStep = 25;
  var scaleValue = parseInt(SCALE.value, 10);
  var scaleTransformValue = function (value) {
    return value / 100;
  };
  var photo = document.querySelector('.img-upload__preview img');

  window.scalePhoto = {
    SCALE: SCALE,
    decrease: function () {
      if (scaleValue > 25) {
        scaleValue -= scaleStep;
        SCALE.value = scaleValue + '%';
        photo.style.transform = 'scale(' + scaleTransformValue(scaleValue) + ')';
      }
    },
    increase: function () {
      if (scaleValue < 100) {
        scaleValue += scaleStep;
        SCALE.value = scaleValue + '%';
        photo.style.transform = 'scale(' + scaleTransformValue(scaleValue) + ')';
      }
    },
    reset: function () {
      SCALE.value = '100%';
      photo.style.transform = 'scale(1)';
    }
  };
})();
