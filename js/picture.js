'use strict';

(function () {
  var photosContainer = document.querySelector('.pictures');

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

  var renderPhotos = function (photos, place) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length - 1; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    place.appendChild(fragment);
  };

  renderPhotos(window.data.generatePhotos, photosContainer);

  window.picture = {
    renderPhotos: renderPhotos
  };
})();
