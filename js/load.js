'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';
  var LOAD_METHOD = 'GET';
  var STATUS_CODE = {
    OK: 200
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

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
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS; // 10s

    xhr.open(LOAD_METHOD, URL);
    xhr.send();
  };

  window.load = {
    download: load
  };
})();
