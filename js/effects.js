'use strict';

(function () {
  var STEP_CHANGE = 25;
  var CURRENT_VALUE = 100;
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;

  var Effect = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
    NONE: 'none'
  };

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var scaleValue = document.querySelector('.scale__control--value');
  var effectLevel = document.querySelector('.effect-level');
  var effectPin = document.querySelector('.effect-level__pin');
  var effectLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectsList = document.querySelector('.effects__list');

  scaleValue.value = CURRENT_VALUE + '%';

  var decreaseScale = function () {
    if (CURRENT_VALUE >= MIN_VALUE + STEP_CHANGE) {
      CURRENT_VALUE -= STEP_CHANGE;
      imagePreview.style.transform = 'scale(' + (CURRENT_VALUE / 100) + ')';
      scaleValue.value = CURRENT_VALUE + '%';
    }
  };

  var increaseScale = function () {
    if (CURRENT_VALUE <= MAX_VALUE - STEP_CHANGE) {
      CURRENT_VALUE += STEP_CHANGE;
      imagePreview.style.transform = 'scale(' + (CURRENT_VALUE / 100) + ')';
      scaleValue.value = CURRENT_VALUE + '%';
    }
  };

  scaleControlSmaller.addEventListener('click', function () {
    decreaseScale();
  });

  scaleControlBigger.addEventListener('click', function () {
    increaseScale();
  });

  var currentEffect = Effect.NONE;

  var chooseEffect = function (value) {
    switch (currentEffect) {
      case Effect.CHROME :
        return 'grayscale(' + value + ')';
      case Effect.SEPIA:
        return 'sepia(' + value + ')';
      case Effect.MARVIN:
        return 'invert(' + value * 100 + '%)';
      case Effect.PHOBOS:
        return 'blur(' + 3 * value + 'px)';
      case Effect.HEAT:
        return 'brightness(' + 3 * value + ')';
      default:
        return 'none';
    }
  };

  var resetEffect = function () {
    effectPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    imagePreview.style.filter = '';
  };

  var changeEffect = function (evt) {
    resetEffect();
    currentEffect = evt.target.value;
    imagePreview.className = '';
    imagePreview.style.filter = Effect.NONE;
    imagePreview.classList.add('effects__preview--' + evt.target.value);
    if (evt.target.value !== 'none') {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }
    imagePreview.style.filter = chooseEffect(1);
  };

  effectsList.addEventListener('change', changeEffect);

  var getSaturationValue = function () {
    return (effectPin.offsetLeft / effectLine.offsetWidth).toFixed(2);
  };

  var changeSaturation = function (evt) {
    var value = getSaturationValue(evt);
    imagePreview.style.filter = chooseEffect(value);
  };

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var effectLineWidth = effectLine.offsetWidth;

    var StartCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var Shift = {
        x: StartCoords.x - moveEvt.clientX,
        y: StartCoords.y
      };
      StartCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (effectPin.offsetLeft < 0) {
        effectPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectPin.offsetLeft > effectLineWidth) {
        effectPin.style.left = effectLineWidth + 'px';
        effectLevelDepth.style.width = effectLineWidth + 'px';
      } else {
        effectPin.style.left = (effectPin.offsetLeft - Shift.x) + 'px';
        effectLevelDepth.style.width = (effectPin.offsetLeft - Shift.x) + 'px';
      }
      changeSaturation();
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
