'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var BODY = document.querySelector('body');
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.util = {
    BODY: BODY,
    makeBodyUnscrolled: function () {
      window.util.BODY.classList.add('modal-open');
    },
    makeBodyScrolled: function () {
      window.util.BODY.classList.remove('modal-open');
    },
    isEscEvent: function (evt, action, activeElement) {
      if (evt.keyCode !== ESC_KEYCODE) {
        return;
      }

      if (activeElement && document.activeElement === activeElement) {
        activeElement.blur();
      } else {
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
    },
    debounce: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    },
  };
})();
