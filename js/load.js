'use strict';

(function () {
  var URL = {
    LOAD: 'https://javascript.pages.academy/kekstagram/data',
    UPLOAD: 'https://javascript.pages.academy/kekstagram'
  };

  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';
  var METHOD = {
    GET: 'GET',
    POST: 'POST'
  };

  var STATUS_CODE = {
    OK: 200
  };

  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT_IN_MS + 'мс');
    });
    return xhr;
  };

  window.load = {
    load: function (onSuccess, onError) {
      var xhr = makeRequest(onSuccess, onError);
      xhr.open(METHOD.GET, URL.LOAD);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = makeRequest(onSuccess, onError);
      xhr.open(METHOD.POST, URL.UPLOAD);
      xhr.send(data);
    }
  };
})();
