'use strict';

(function () {
  var renderPhotos = function (photos) {
    var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 25; i++) {
      var photo = photos[i];
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      fragment.appendChild(photoElement);
    }
    var photosContainer = document.querySelector('.pictures');
    photosContainer.appendChild(fragment);
  };

  window.picture = {
    renderPhotos: renderPhotos
  };
})();
