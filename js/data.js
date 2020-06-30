'use strict'

(function () {
    var PHOTOS_AMOUNT = 25;
    var LIKES_MIN = 15;
    var LIKES_MAX = 200;
    var COMMENTS_MIN = 1;
    var COMMENTS_MAX = 5;
    var AVATAR_MIN = 1;
    var AVATAR_MAX = 6;
    
    var USERS_NAMES = [
      'Александр Сергеевич',
      'Лев Николаевич',
      'Иосиф Александрович',
      'Петр Ильич',
      'Сергей Васильевич',
      'Николай Андреевич'
    ];
    var USERS_COMMENTS = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];

    var generateComments = function (amount) {
        var comments = [];
        for (var i = 0; i <= amount; i++) {
          comments.push({
            avatar: 'img/avatar' + window.util.getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
            message: window.util.getRandomElement(USERS_COMMENTS),
            name: window.util.getRandomElement(USERS_NAMES)
          });
        }
        return comments;
      };
      
      var generatePhotos = function (amount) {
        var photos = [];
        for (var i = 0; i <= amount; i++) {
          photos.push({
            url: 'photos/' + (i + 1) + '.jpg',
            description: '',
            likes: window.util.getRandomNumber(LIKES_MIN, LIKES_MAX),
            comments: generateComments(window.util.getRandomNumber(COMMENTS_MIN, COMMENTS_MAX))
          });
        }
        return photos;
      };
      var photosArray = generatePhotos(PHOTOS_AMOUNT);

      window.data = {
        photos: photosArray
      };
})();
























var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  return photoElement;
};

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length - 1; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  return fragment;
};

var photosArray = generatePhotos(PHOTOS_AMOUNT);
photosContainer.appendChild(renderPhotos(photosArray));

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

var hashTagInput = document.querySelector('.text__hashtags');

var validateHashTags = function () {
  hashTagInput.addEventListener('input', function () {
    var hashTagValue = hashTagInput.value;
    var MIN_TAG_LENGTH = 2;
    var MAX_TAG_LENGTH = 20;
    var regex = /^#[a-zа-яA-ZА-Я0-9]*$/;
    var hashTagAmount = 5;
    var hashTags = hashTagValue.split(' ');

    var checkHashTagsRepeat = function (arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            return true;
          }
        }
      }
      return false;
    };

    for (var i = 0; i < hashTags.length; i++) {
      if (!regex.test(hashTags[i])) {
        hashTagInput.setCustomValidity('Введенный текст не соответствует формату');
      } else if (hashTags.length > hashTagAmount) {
        hashTagInput.setCustomValidity('Количество хэштегов не должно быть больше 5');
      } else if (checkHashTagsRepeat(hashTags)) {
        hashTagInput.setCustomValidity('Хэштеги не должны повторяться');
      } else if (hashTagValue.length < MIN_TAG_LENGTH) {
        hashTagInput.setCustomValidity('Длина хэштега не должна быть меньше 2 символов');
      } else if (hashTagValue.length > MAX_TAG_LENGTH) {
        hashTagInput.setCustomValidity('Длина хэштега не должна превышать 20 символов');
      } else {
        hashTagInput.setCustomValidity('');
      }
    }
  });
};

validateHashTags();

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


