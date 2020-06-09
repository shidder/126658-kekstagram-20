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

var generateComment = function () {
  return {
    avatar: 'img/avatar' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
    message: getRandomElement(USERS_COMMENTS),
    name: getRandomElement(USERS_NAMES)
  };
};

var generateComments = function (amount) {
  var comments = [];
  for (var i = 0; i <= amount; i++) {
    comments.push(generateComment());
  }
  return comments.length - 1;
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
  photoElement.querySelector('.picture__comments').textContent = photo.comments;
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
