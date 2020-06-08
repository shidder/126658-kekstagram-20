'use strict';
var PHOTOS_AMOUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 5;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var photoDescription = '';

var usersNames = [
  'Александр Сергеевич',
  'Лев Николаевич',
  'Иосиф Александрович',
  'Петр Ильич',
  'Сергей Васильевич',
  'Николай Андреевич'
];
var usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var generateOneComment = function () {
  return {
    avatar: 'img/avatar' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
    message: getRandomElement(usersComments),
    name: getRandomElement(usersNames)
  };
};

var generateAllComments = function () {
  var commentsQuantity = [];
  var commentsFact = getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
  for (var i = 0; i <= commentsFact; i++) {
    commentsQuantity.push(generateOneComment());
  }
  return commentsQuantity.length - 1;
};

var generatePhotos = function (counter) {
  var photos = [];
  for (var j = 0; j <= counter; j++) {
    photos.push({
      url: 'photos/' + (j + 1) + '.jpg',
      description: photoDescription,
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: generateAllComments()
    });
  }
  return photos;
};

var photosArray = generatePhotos(PHOTOS_AMOUNT);
var photosList = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < photosArray.length - 1; j++) {
  fragment.appendChild(renderPhoto(photosArray[j]));
}
photosList.appendChild(fragment);
