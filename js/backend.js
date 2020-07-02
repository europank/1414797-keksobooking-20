'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        window.mess.setMessageError();
      }
    });
    xhr.addEventListener('error', function () {
      window.mess.setMessageError();
    });
    xhr.addEventListener('timeout', function () {
      window.mess.setMessageError();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        window.mess.setMessageSuccess();
        window.main.disactivationPage();
        window.main.closeCard();
        window.main.clearForm();

      } else {
        window.mess.setMessageError();
      }
    });
    xhr.addEventListener('error', function () {
      window.mess.setMessageError();
    });
    xhr.addEventListener('timeout', function () {
      window.mess.setMessageError();
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };


})();
