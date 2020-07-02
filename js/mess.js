'use strict';

(function () {
  var successMessage = document.querySelector('#success').content;
  var errorMessage = document.querySelector('#error').content;
  var main = document.querySelector('main');

  var onSuccessMessage = function () {
    var message = successMessage.cloneNode(true);
    return message;
  };

  var setMessageSuccess = function () {
    var element = onSuccessMessage();
    main.appendChild(element);
    document.addEventListener('keydown', closeMessageSuccessEsc);
    document.addEventListener('click', closeMessageSuccessClick);
  };

  var closeMessage = function (message) {
    if (message) {
      main.removeChild(message);
    }
  };

  var closeMessageSuccessEsc = function (evt) {
    if (evt.key === 'Escape') {
      var messageOk = document.querySelector('.success');
      closeMessage(messageOk);
    }
  };

  var closeMessageSuccessClick = function () {
    var messageOk = document.querySelector('.success');
    closeMessage(messageOk);
  };

  var onErrorMessage = function () {
    var message = errorMessage.cloneNode(true);
    return message;
  };

  var setMessageError = function () {
    var element = onErrorMessage();
    var errorButton = document.querySelector('.error__button');
    main.appendChild(element);
    document.addEventListener('keydown', closeMessageErrorEsc);
    document.addEventListener('click', closeMessageErrorClick);
    errorButton.addEventListener('click', closeMessageErrorClick);
  };

  var closeMessageErrorClick = function () {
    var messageError = document.querySelector('.error');
    closeMessage(messageError);
  };

  var closeMessageErrorEsc = function (evt) {
    if (evt.key === 'Escape') {
      var messageError = document.querySelector('.error');
      closeMessage(messageError);
    }
  };

  window.mess = {
    setMessageSuccess: setMessageSuccess,
    setMessageError: setMessageError
  };


})();
