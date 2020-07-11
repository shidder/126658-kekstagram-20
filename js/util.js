'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  var pressEscape = function (evt, callback) {
    if (evt.key === 'Escape') {
      callback();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    pressEscape: pressEscape
  };
})();
