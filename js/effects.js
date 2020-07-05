'use strict';

(function () {
  var chromeEffect = document.querySelector('#effect-chrome');
  var sepiaEffect = document.querySelector('#effect-sepia');
  var marvinEffect = document.querySelector('#effect-marvin');
  var phobosEffect = document.querySelector('#effect-phobos');
  var heatEffect = document.querySelector('#effect-heat');
  var noneEffect = document.querySelector('#effect-none');

  noneEffect.addEventListener('click', function () {
    document.querySelector('.effect-level').classList.add('hidden');
    window.preview.imagePreview.removeAttribute('class');
    window.preview.imagePreview.classList.add('effects__preview--none');
    window.preview.imagePreview.style.filter = 'none';
  });

  chromeEffect.addEventListener('click', function () {
    window.preview.imagePreview.removeAttribute('class');
    window.preview.imagePreview.classList.add('effects__preview--chrome');
    document.querySelector('.effect-level__pin').style.left = '100' + '%';
    document.querySelector('.effect-level__depth').style.width = '100' + '%';
    window.preview.imagePreview.style.filter = 'grayscale(1)';
    document.querySelector('.effect-level').classList.remove('hidden');
  });

  sepiaEffect.addEventListener('click', function () {
    window.preview.imagePreview.removeAttribute('class');
    window.preview.imagePreview.classList.add('effects__preview--sepia');
    document.querySelector('.effect-level__pin').style.left = '100' + '%';
    document.querySelector('.effect-level__depth').style.width = '100' + '%';
    window.preview.imagePreview.style.filter = 'sepia(1)';
    document.querySelector('.effect-level').classList.remove('hidden');
  });

  marvinEffect.addEventListener('click', function () {
    window.preview.imagePreview.removeAttribute('class');
    window.preview.imagePreview.classList.add('effects__preview--marvin');
    document.querySelector('.effect-level__pin').style.left = '100' + '%';
    document.querySelector('.effect-level__depth').style.width = '100' + '%';
    window.preview.imagePreview.style.filter = 'invert(100%)';
    document.querySelector('.effect-level').classList.remove('hidden');
  });

  phobosEffect.addEventListener('click', function () {
    window.preview.imagePreview.removeAttribute('class');
    window.preview.imagePreview.classList.add('effects__preview--phobos');
    document.querySelector('.effect-level__pin').style.left = '100' + '%';
    document.querySelector('.effect-level__depth').style.width = '100' + '%';
    window.preview.imagePreview.style.filter = 'blur(3px)';
    document.querySelector('.effect-level').classList.remove('hidden');
  });

  heatEffect.addEventListener('click', function () {
    window.preview.imagePreview.removeAttribute('class');
    window.preview.imagePreview.classList.add('effects__preview--heat');
    document.querySelector('.effect-level__pin').style.left = '100' + '%';
    document.querySelector('.effect-level__depth').style.width = '100' + '%';
    window.preview.imagePreview.style.filter = 'brightness(3)';
    document.querySelector('.effect-level').classList.remove('hidden');
  });

  var effectPin = document.querySelector('.effect-level__pin');
  var effectLevelInput = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  effectPin.style.left = '100' + '%';
  effectLevelDepth.style.width = '100' + '%';
  var effectLevelLineWidth = 453;

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
      if (window.preview.imagePreview.classList.contains('effects__preview--chrome')) {
        window.preview.imagePreview.style.filter = 'grayscale(' + effectLevelInput.value / 100 + ')';
      }
      if (window.preview.imagePreview.classList.contains('effects__preview--sepia')) {
        window.preview.imagePreview.style.filter = 'sepia(' + effectLevelInput.value / 100 + ')';
      }
      if (window.preview.imagePreview.classList.contains('effects__preview--marvin')) {
        window.preview.imagePreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
      }
      if (window.preview.imagePreview.classList.contains('effects__preview--phobos')) {
        window.preview.imagePreview.style.filter = 'blur(' + effectLevelInput.value / 100 * 3 + 'px)';
      }
      if (window.preview.imagePreview.classList.contains('effects__preview--heat')) {
        window.preview.imagePreview.style.filter = 'brightness(' + effectLevelInput.value / 100 * 3 + ')';
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
