'use strict';

(function () {
  var photosContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var closePhotoButton = document.querySelector('.big-picture__cancel');
  var bigPhoto = document.querySelector('.big-picture');
  var socialComment = bigPhoto.querySelector('.social__comment');
  var socialCommentCount = bigPhoto.querySelector('.social__comment-count');
  var commentsLoader = bigPhoto.querySelector('.comments-loader');

  var AVATAR_SIZE = 35;

  var openBigPhoto = function () {
    bigPhoto.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  var renderPhoto = function (photo) {
    var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.addEventListener('click', function () {
      renderBigPhoto(photo);
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
    });
    closePhotoButton.addEventListener('click', function () {
      closeBigPhoto();
    });
    return photoElement;
  };

  var renderPhotos = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    photosContainer.appendChild(fragment);
  };

  var generateComment = function (comment) {
    var newSocialComment = socialComment.cloneNode(true);
    newSocialComment.querySelector('.social__picture').src = comment.avatar;
    newSocialComment.querySelector('.social__picture').alt = comment.name;
    newSocialComment.querySelector('.social__picture').width = AVATAR_SIZE;
    newSocialComment.querySelector('.social__picture').height = AVATAR_SIZE;
    newSocialComment.querySelector('.social__text').textContent = comment.message;
    return newSocialComment;
  };

  var renderBigPhoto = function (photo) {
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    for (var i = 0; i < photo.comments.length; i++) {
      fragment.appendChild(generateComment(photo.comments[i], socialComment));
    }
    if (photo.comments.length > 0) {
      bigPhoto.querySelector('.social__comments').innerHTML = '';
    }
    bigPhoto.querySelector('.social__comments').appendChild(fragment);
    openBigPhoto();
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closeBigPhoto();
      }
    });
  };

    window.picture = {
    renderPhotos: renderPhotos,
  };
})();
