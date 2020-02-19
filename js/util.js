'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var BODY = document.querySelector('body');

  window.util = {
    BODY: BODY,
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    showDomElement: function (element) {
      element.classList.remove('hidden');
    },
    closeDomElement: function (element) {
      element.classList.add('hidden');
    },
    getRandomInteger: function (min, max) {
      var randomValue = min + Math.random() * (max + 1 - min);
      return Math.floor(randomValue);
    },
    getRandomArrayItem: function (array) {
      return array[this.getRandomInteger(0, array.length - 1)];
    }
  };
})();
