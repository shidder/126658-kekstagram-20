'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var setupForm = document.querySelector('.img-upload__overlay');
  var bodyElement = document.querySelector('body');

  var openSetupForm = function () {
    setupForm.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
  };

  var closeSetupForm = function () {
    setupForm.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  };

  var resetFormData = function () {
    uploadForm.reset();
  };

  var closeFormEscape = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSetupForm();
      resetFormData();
      document.removeEventListener('keydown', closeFormEscape);
    }
  };

  uploadFile.addEventListener('change', function () {
    openSetupForm();
    document.querySelector('.img-upload__preview img').classList.add('.effects__preview--none');
    document.querySelector('.effect-level').classList.add('hidden');
    document.addEventListener('keydown', closeFormEscape);
  });

  uploadCancel.addEventListener('click', function () {
    closeSetupForm();
    resetFormData();
  });

  var main = document.querySelector('main');

  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessagePopup = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessagePopup);

    var closeSuccessMessagePopup = function () {
      successMessagePopup.remove();
      document.removeEventListener('keydown', pressSuccessPopupEscape);
    };

    var clickSuccessButton = function () {
      closeSuccessMessagePopup();
    };

    var pressSuccessPopupEscape = function (evt) {
      if (evt.key === 'Escape') {
        closeSuccessMessagePopup();
      }
    };

    successMessagePopup.addEventListener('click', clickSuccessButton);
    document.addEventListener('keydown', pressSuccessPopupEscape);
  };

  var onSuccess = function () {
    closeSetupForm();
    resetFormData();
    showSuccessMessage();
  };

  var showErrorMessage = function (errorMessage) {
    var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorMessagePopup = errorMessageTemplate.cloneNode(true);
    errorMessagePopup.querySelector('.error__title').textContent = errorMessage;
    main.appendChild(errorMessagePopup);

    var closeErrorMessagePopup = function () {
      errorMessagePopup.remove();
      document.removeEventListener('keydown', closeErrorMessagePopup);
    };

    var clickErrorButton = function () {
      closeErrorMessagePopup();
    };

    var pressErrorPopupEscape = function (evt) {
      if (evt.key === 'Escape') {
        closeErrorMessagePopup();
      }
    };

    errorMessagePopup.addEventListener('click', clickErrorButton);
    document.addEventListener('keydown', pressErrorPopupEscape);
    closeSetupForm();
    resetFormData();
  };

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.upload(new FormData(uploadForm), onSuccess, showErrorMessage);
  });
})();