'use strict';

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


var photosContainer = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var generateComments = function (amount) {
  var comments = [];
  for (var i = 0; i <= amount; i++) {
    comments.push({
      avatar: 'img/avatar' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getRandomElement(USERS_COMMENTS),
      name: getRandomElement(USERS_NAMES)
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
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: generateComments(getRandomNumber(COMMENTS_MIN, COMMENTS_MAX))
    });
  }
  return photos;
};

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
});

/*
==========================================================================================================
 Редактирование размера изображения
 */
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var imagePreview = document.querySelector('.img-upload__preview img')
var scaleValue = document.querySelector('.scale__control--value');

var stepChange = 25;
var currentValue = 100;
var minValue = 25;
var maxValue = 100;

scaleValue.value= currentValue + '%';

var decreaseScale = function () {
  if (currentValue >= minValue + stepChange) {
    currentValue -= stepChange;
    imagePreview.style.transform = 'scale(' + (currentValue / 100) + ')';
    scaleValue.value = currentValue + '%';
  }
}

var increaseScale = function () {
   if (currentValue <= maxValue - stepChange) {
     currentValue += stepChange;
    imagePreview.style.transform = 'scale(' + (currentValue / 100) + ')'
    scaleValue.value = currentValue + '%';
  }
}

scaleControlSmaller.addEventListener('click', function () {
   decreaseScale();
})

scaleControlBigger.addEventListener('click', function () {
  increaseScale();
})

/*
==========================================================================================================
 Применение эффекта для изображения
 При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
  добавить картинке внутри .img-upload__preview CSS-класс,
  соответствующий эффекту. Например, если выбран эффект .effect-chrome,
  изображению нужно добавить класс effects__preview--chrome.
 */

var chromeEffect = document.querySelector('#effect-chrome');
var sepiaEffect = document.querySelector('#effect-sepia');
var marvinEffect = document.querySelector('#effect-marvin');
var phobosEffect = document.querySelector('#effect-phobos');
var heatEffect = document.querySelector('#effect-heat');

chromeEffect.addEventListener('click', function () {
   imagePreview.classList.add('effects__preview--chrome');
  });

sepiaEffect.addEventListener('click', function () {
  imagePreview.classList.remove('effects__preview--chrome');
  imagePreview.classList.add('effects__preview--sepia');
});

marvinEffect.addEventListener('click', function () {
  imagePreview.classList.remove('effects__preview--chrome');
  imagePreview.classList.remove('effects__preview--sepia');
  imagePreview.classList.add('effects__preview--marvin');
});

phobosEffect.addEventListener('click', function () {
  imagePreview.classList.remove('effects__preview--chrome');
  imagePreview.classList.remove('effects__preview--sepia');
  imagePreview.classList.remove('effects__preview--marvin');
  imagePreview.classList.add('effects__preview--phobos');
});

heatEffect.addEventListener('click', function () {
  imagePreview.classList.remove('effects__preview--chrome');
  imagePreview.classList.remove('effects__preview--sepia');
  imagePreview.classList.remove('effects__preview--marvin');
  imagePreview.classList.remove('effects__preview--phobos');
  imagePreview.classList.add('effects__preview--heat');
});
