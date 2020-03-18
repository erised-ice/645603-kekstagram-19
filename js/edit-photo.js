'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var effectLevelPinMiddle = effectLevelPin.offsetWidth / 2;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (effectLevelPin.offsetLeft <= 0) {
        effectLevelPin.style.left = '0px';
      }

      if (effectLevelPin.offsetLeft >= 455) {
        effectLevelPin.style.left = '455px';
      }

      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      effectLevelValue.value = (effectLevelPin.offsetLeft + effectLevelPinMiddle - shift.x) / 455 * 100;

      if (effectLevelValue.value >= 100) {
        effectLevelValue.value = 100;
      }

      if (effectLevelValue.value <= 0) {
        effectLevelValue.value = 0;
      }

      effectLevelDepth.style.width = effectLevelValue.value + '%';

      if (startCoords.y < 620 || startCoords.y > 650 || effectLevelPin.offsetLeft > 460 || effectLevelPin.offsetLeft < -5) {
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
  });
})();
