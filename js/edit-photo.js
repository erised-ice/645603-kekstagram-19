'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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
