'use strict'

window.util = (function () {   
    var getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      
      var getRandomElement = function (array) {
        return array[getRandomNumber(0, array.length - 1)];
      };
})();