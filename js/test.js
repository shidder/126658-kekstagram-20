'use strict';



/*
==========================================================================================================
  Загрузка нового изображения на сайт
 */

var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var setupForm = document.querySelector('.img-upload__overlay');
var bodyElement = document.querySelector('body');

uploadFile.addEventListener('change', function () {
  setupForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.querySelector('.img-upload__preview img').classList.add('.effects__preview--sepia')
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      setupForm.classList.add('hidden');
    }
  });
});

uploadCancel.addEventListener('click', function () {
  setupForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadFile.value = '';
});

/*
==========================================================================================================
 Редактирование размера изображения
 */
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var imagePreview = document.querySelector('.img-upload__preview img');
var scaleValue = document.querySelector('.scale__control--value');

var stepChange = 25;
var currentValue = 100;
var minValue = 25;
var maxValue = 100;

scaleValue.value = currentValue + '%';

var decreaseScale = function () {
  if (currentValue >= minValue + stepChange) {
    currentValue -= stepChange;
    imagePreview.style.transform = 'scale(' + (currentValue / 100) + ')';
    scaleValue.value = currentValue + '%';
  }
};

var increaseScale = function () {
  if (currentValue <= maxValue - stepChange) {
    currentValue += stepChange;
    imagePreview.style.transform = 'scale(' + (currentValue / 100) + ')';
    scaleValue.value = currentValue + '%';
  }
};

scaleControlSmaller.addEventListener('click', function () {
  decreaseScale();
});

scaleControlBigger.addEventListener('click', function () {
  increaseScale();
});

/*
==========================================================================================================
 Применение эффекта для изображения
 */

var chromeEffect = document.querySelector('#effect-chrome');
var sepiaEffect = document.querySelector('#effect-sepia');
var marvinEffect = document.querySelector('#effect-marvin');
var phobosEffect = document.querySelector('#effect-phobos');
var heatEffect = document.querySelector('#effect-heat');
var noneEffect = document.querySelector('#effect-none');
var effectLevel = document.querySelector('.effect-level');


noneEffect.addEventListener('click', function () {
  imagePreview.removeAttribute('class');
  imagePreview.classList.add('effects__preview--none');
  imagePreview.style.filter = 'none';
});

chromeEffect.addEventListener('click', function () {
  imagePreview.removeAttribute('class');
  imagePreview.classList.add('effects__preview--chrome');
  imagePreview.style.filter = 'grayscale(1)';
});

sepiaEffect.addEventListener('click', function () {
  imagePreview.removeAttribute('class');
  imagePreview.classList.add('effects__preview--sepia');
  imagePreview.style.filter = 'sepia(1)';
});

marvinEffect.addEventListener('click', function () {
  imagePreview.removeAttribute('class');
  imagePreview.classList.add('effects__preview--marvin');
  imagePreview.style.filter = 'invert(100%)';
});

phobosEffect.addEventListener('click', function () {
  imagePreview.removeAttribute('class');
  imagePreview.classList.add('effects__preview--phobos');
  imagePreview.style.filter = 'blur(3px)';
});

heatEffect.addEventListener('click', function () {
  imagePreview.removeAttribute('class');
  imagePreview.classList.add('effects__preview--heat');
  imagePreview.style.filter = 'brightness(3)';
});



/*
==========================================================================================================
 Валидация хэш-тегов
 */


/*
==========================================================================================================
 Изменение уровня насыщенности
 */

var effectPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');

var effectLevelInput = document.querySelector('.effect-level__value');
var effectLevelDepth = document.querySelector('.effect-level__depth');
effectPin.style.left = '100' + '%';
effectLevelDepth.style.width = '100' + '%';
var  effectLevelLineWidth = 453;

effectPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y
    };
    startCoords = {
      x: moveEvt.clientX
    };
    effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
    effectLevelDepth.style.width = (effectPin.offsetLeft - shift.x) + 'px';
    if ((effectPin.offsetLeft - shift.x) < 0) {
      effectPin.style.left = '0';
      effectLevelDepth.style.width = '0';
    }
    if ((effectPin.offsetLeft - shift.x) > effectLevelLineWidth) {
      effectPin.style.left = effectLevelLineWidth + 'px';
      effectLevelDepth.style.width = effectLevelLineWidth + 'px';
    }
    effectLevelInput.value = ((effectPin.offsetLeft - shift.x) / effectLevelLineWidth) * 100;
    if (imagePreview.classList.contains('effects__preview--chrome')) {
      imagePreview.style.filter = 'grayscale(' + effectLevelInput.value / 100 + ')';
    }
    if (imagePreview.classList.contains('effects__preview--sepia')) {
      imagePreview.style.filter = 'sepia(' + effectLevelInput.value / 100 + ')';
    }
    if (imagePreview.classList.contains('effects__preview--marvin')) {
      imagePreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
    }
    if (imagePreview.classList.contains('effects__preview--phobos')) {
      imagePreview.style.filter = 'blur(' + effectLevelInput.value / 100 * 3 + 'px)';
    }
    if (imagePreview.classList.contains('effects__preview--heat')) {
      imagePreview.style.filter = 'brightness(' + effectLevelInput.value / 100 * 3 + ')';
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


