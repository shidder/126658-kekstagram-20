'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var setupForm = document.querySelector('.img-upload__overlay');
  var bodyElement = document.querySelector('body');

  uploadFile.addEventListener('change', function () {
    setupForm.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.querySelector('.img-upload__preview img').classList.add('.effects__preview--none');
    document.querySelector('.effect-level').classList.add('hidden');
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

  window.upload = {
    imagePreview: imagePreview
  };
})();
