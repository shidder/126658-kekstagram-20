'use strict';

(function () {

  var photosContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var renderPhoto = function (photo) {
    var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  };

  var renderPhotos = function (photos) {

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    photosContainer.appendChild(fragment);
  };

   window.picture = {
    renderPhotos: renderPhotos,
  };
})();
