'use strict';

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
    generatePhotos: photosArray
  };
})();
