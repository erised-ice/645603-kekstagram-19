'use strict';

(function () {
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENTGH = 20;
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_COMMENT_LENGTH = 140;

  var hashtagsInput = document.querySelector('.text__hashtags');
  var socialFooterText = document.querySelector('.social__footer-text');
  var textDescription = document.querySelector('.text__description');

  var isUniqueArray = function (array) {
    var uniqueObject = {};

    for (var i = 0; i < array.length; i++) {
      var current = array[i];
      if (uniqueObject[current]) {
        return false;
      }
      uniqueObject[current] = true;
    }
    return true;
  };

  var isContainSymbols = function (word) {
    return word.match(/^#[a-zA-Z0-9а-яА-Я]+$/);
  };

  var commentValidation = function (evt) {
    var target = evt.target;

    if (target.value.length > MAX_COMMENT_LENGTH) {
      target.setCustomValidity('максимальная длина одного комментария ' + MAX_COMMENT_LENGTH + ' символов.');
    }
  };

  hashtagsInput.addEventListener('input', function () {
    var hashtagsLowCase = hashtagsInput.value.toLowerCase();
    var hashtagsArray = hashtagsLowCase.split(' ');

    if (hashtagsArray.length > MAX_HASHTAGS_COUNT) {
      hashtagsInput.setCustomValidity('Нельзя указать больше ' + MAX_HASHTAGS_COUNT + ' хэш-тегов');
    } else {
      for (var i = 0; i < hashtagsArray.length; i++) {
        if (!isUniqueArray(hashtagsArray)) {
          hashtagsInput.setCustomValidity('хэш-теги не должны повторяться');
        } else if (hashtagsArray[i][0] !== '#') {
          hashtagsInput.setCustomValidity('хэш-тег должен начинаться с символа #');
        } else if (hashtagsArray[i].length < MIN_HASHTAG_LENGTH) {
          hashtagsInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (hashtagsArray[i].length > MAX_HASHTAG_LENTGH) {
          hashtagsInput.setCustomValidity('максимальная длина одного хэш-тега ' + MAX_HASHTAG_LENTGH + ' символов, включая решётку');
        } else if (!isContainSymbols(hashtagsArray[i])) {
          hashtagsInput.setCustomValidity('Должен начинаться с решетки и состоять только из букв и цифр');
        } else {
          hashtagsInput.setCustomValidity('');
        }
      }
    }
  });

  socialFooterText.addEventListener('input', commentValidation);
  textDescription.addEventListener('input', commentValidation);
})();
