'use strict';

(function () {
  var hashTagInput = document.querySelector('.text__hashtags');

  var validateHashTags = function () {
    hashTagInput.addEventListener('input', function () {
      var hashTagValue = hashTagInput.value;
      var MIN_TAG_LENGTH = 2;
      var MAX_TAG_LENGTH = 20;
      var regex = /^#[a-zа-яA-ZА-Я0-9]*$/;
      var hashTagAmount = 5;
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
        } else if (hashTags.length > hashTagAmount) {
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
    });
  };

  var textComments = document.querySelector('.text__description');
  var validateComments = function () {
    textComments.addEventListener('input', function () {
      var MAX_LENGTH = 140;
      var textCommentsValue = textComments.value;
      if (textCommentsValue.length === MAX_LENGTH) {
        textComments.setCustomValidity('Вы ввели максимальное допустимое количество символов');
      } if (textCommentsValue.length > MAX_LENGTH) {
        textComments.setCustomValidity('Удалите лишние ' + (textCommentsValue.length - MAX_LENGTH) + ' симв.');
      } else {
        textComments.setCustomValidity('');
      }
    });
  };

  window.validation = {
    validateHashTags: validateHashTags,
    validateComments: validateComments
  };
})();
