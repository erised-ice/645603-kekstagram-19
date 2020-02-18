'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');

  effectLevelPin.addEventListener('mouseup', function () {
    effectLevelValue.value = 0.5;
  });
})();
