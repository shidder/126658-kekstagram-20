'use strict';

(function () {
  var RANDOM_PHOTOS = 10;

  var photosData = null;
  var imageFilters = document.querySelector('.img-filters');

  var removePhotos = function () {
    var photoElements = Array.from(window.picture.photosContainer.querySelectorAll('.picture'));
    photoElements.forEach(function (item) {
      window.picture.photosContainer.removeChild(item);
    });
  };

  var imageFiltersMap = {
    'filter-default': window.debounce(function (array) {
      removePhotos();
      window.picture.renderPhotos(array);
    }),

    'filter-random': window.debounce(function (array) {
      var randomArray = array.slice();
      randomArray = window.util.shuffleArray(randomArray).slice(0, RANDOM_PHOTOS);
      removePhotos();
      window.picture.renderPhotos(randomArray);
    }),

    'filter-discussed': window.debounce(function (array) {
      var discussedArray = array.slice()
        .sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      removePhotos();
      window.picture.renderPhotos(discussedArray);
    })
  };

  var clickOnImageFilters = function (evt) {
    var clickedButton = evt.target;
    var activeButton = imageFilters.querySelector('.img-filters__button--active');

    if (clickedButton !== activeButton) {
      if (clickedButton.classList.contains('img-filters__button')) {
        activeButton.classList.remove('img-filters__button--active');
        clickedButton.classList.add('img-filters__button--active');
        imageFiltersMap[clickedButton.id](photosData);
      }
    }

    if (clickedButton === activeButton) {
      activeButton.classList.remove('img-filters__button--active');
      clickedButton.classList.add('img-filters__button--active');
      imageFiltersMap[clickedButton.id](photosData);
    }
  };

  var showFilters = function () {
    imageFilters.classList.remove('img-filters--inactive');
    imageFilters.addEventListener('click', clickOnImageFilters);
  };

  var onSuccess = function (photos) {
    photosData = photos;
    window.picture.renderPhotos(photos);
    showFilters();
  };

  window.filters = {
    onSuccess: onSuccess
  };
})();
