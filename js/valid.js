'use strict';

(function () {
  var MIN_PRICE_MAP = {
    'palace': '10000',
    'flat': '1000',
    'house': '5000',
    'bungalo': '0'
  };
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var oneHundredRooms = document.querySelector('option[value="100"]');
  var oneRoom = document.querySelector('option[value="1"]');
  var notForGuests = document.querySelector('#capacity option[value="0"]');
  var guestNumberArray = document.querySelectorAll('#capacity option');
  var guestNumberSelect = document.querySelector('#capacity');
  var roomNumberSelect = document.querySelector('#room_number');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var typeHouse = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var numberRoomsValidity = function () {
    for (var i = 0; i < guestNumberArray.length; i++) {
      var guests = guestNumberArray[i];
      var value = guests.value;
      var select = roomNumberSelect.value;
      var hundred = oneHundredRooms.value;
      var room = oneRoom.value;
      var noGuest = notForGuests.value;
      if (select === hundred && value === noGuest) {
        guests.removeAttribute('disabled', 'disabled');
        guestNumberSelect.value = noGuest;
      } else if (select === hundred && value === room) {
        guests.setAttribute('disabled', 'disabled');
      } else if (select < value || value === noGuest) {
        guests.setAttribute('disabled', 'disabled');
        guestNumberSelect.value = select;
      } else {
        guests.removeAttribute('disabled', 'disabled');
      }
    }
  };


  var emptyFieldValidity = function (evt) {
    var target = evt.target;
    if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле');
    } else {
      target.setCustomValidity('');
    }
  };

  var titleValidity = function () {
    var valueLength = title.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      title.setCustomValidity('Нужно ввести ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' символов');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      title.setCustomValidity('Вы превысили максимальную длину заголовка на ' + (valueLength - MAX_TITLE_LENGTH) + ' символов');
    } else {
      title.setCustomValidity('');
    }
  };

  var priceValidity = function (evt) {
    var input = evt.target;
    var priceValue = parseInt(input.value, 10);
    if (priceValue > MAX_PRICE) {
      price.setCustomValidity('Вы превысили максимально допустимое значение на ' + (priceValue - MAX_PRICE));
    } else {
      price.setCustomValidity('');
    }
  };

  var minPriceValidity = function () {
    price.min = parseInt(MIN_PRICE_MAP[typeHouse.value], 10);
    price.placeholder = MIN_PRICE_MAP[typeHouse.value];
  };

  var minPriceInvalidity = function () {
    minPriceValidity();
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Некорректные данные');
    } else {
      price.setCustomValidity('');
    }
  };

  var timeOutValidity = function (evt) {
    timeIn.value = evt.target.value;
  };

  var timeInValidity = function (evt) {
    timeOut.value = evt.target.value;
  };

  window.valid = {
    numberRoomsValidity: numberRoomsValidity,
    emptyFieldValidity: emptyFieldValidity,
    titleValidity: titleValidity,
    priceValidity: priceValidity,
    minPriceValidity: minPriceValidity,
    minPriceInvalidity: minPriceInvalidity,
    timeOutValidity: timeOutValidity,
    timeInValidity: timeInValidity
  };
})();
