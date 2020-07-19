'use strict';

(function () {
  var Key = {
    ESC: 'Escape'
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  var pressEscape = function (evt, callback) {
    if (evt.key === Key.ESC) {
      callback();
    }
  };

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temporaryValue = array[j];
      array[j] = array[i];
      array[i] = temporaryValue;
    }
    return array;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    pressEscape: pressEscape,
    shuffleArray: shuffleArray
  };
})();
