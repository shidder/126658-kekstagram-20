'use strict';

(function () {
  var MAX_LENGTH = 140;
  var MIN_TAG_LENGTH = 2;
  var MAX_TAG_LENGTH = 20;
  var HASH_TAG_AMOUNT = 5;
  var hashTagInput = document.querySelector('.text__hashtags');

  var validateHashTags = function () {
    var hashTagValue = hashTagInput.value;
    var regex = /^#[a-zа-яA-ZА-Я0-9]*$/;
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
      } else if (hashTags.length > HASH_TAG_AMOUNT) {
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
    if (hashTagValue.length === 0) {
      hashTagInput.setCustomValidity('');
    }
  };

  var textComments = document.querySelector('.text__description');
  var validateComments = function () {
    var textCommentsValue = textComments.value;
    if (textCommentsValue.length === MAX_LENGTH) {
      textComments.setCustomValidity('Вы ввели максимальное допустимое количество символов');
    } if (textCommentsValue.length > MAX_LENGTH) {
      textComments.setCustomValidity('Удалите лишние ' + (textCommentsValue.length - MAX_LENGTH) + ' симв.');
    } else {
      textComments.setCustomValidity('');
    }
  };

  hashTagInput.addEventListener('input', function () {
    validateHashTags();
  });

  textComments.addEventListener('input', function () {
    validateComments();
  });

  window.validation = {
    validateHashTags: validateHashTags,
    validateComments: validateComments
  };
})();
