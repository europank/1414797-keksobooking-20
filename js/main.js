'use strict';

(function () {
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 62;
  var PIN_MAIN_HEIGHT_ACTIVE = 84;
  var NUMBER_OF_OBJECTS = 8;
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var roomNumberSelect = document.querySelector('#room_number');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var typeHouse = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var mapBlock = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var formElements = document.querySelectorAll('.ad-form fieldset');
  var mapFiltersElements = document.querySelector('.map__filters').children;


  var setAddressPin = function (element, valueData) {
    element.setAttribute('placeholder', valueData);
    element.setAttribute('readonly', 'readonly');
    element.value = valueData;
  };

  var pinMainXActive = parseInt(pinMain.style.left, 10) - PIN_MAIN_WIDTH / 2;
  var pinMainYActive = parseInt(pinMain.style.top, 10) - PIN_MAIN_HEIGHT_ACTIVE;
  var pinMainXDisactive = parseInt(pinMain.style.left, 10) - PIN_MAIN_WIDTH / 2;
  var pinMainYDisactive = parseInt(pinMain.style.top, 10) - PIN_MAIN_HEIGHT / 2;

  var activationPage = function () {
    mapBlock.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    setAddressPin(addressInput, pinMainXActive + ', ' + pinMainYActive);
    title.setAttribute('required', 'required');
    price.setAttribute('required', 'required');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled', 'disabled');
    }
    for (var j = 0; j < mapFiltersElements.length; j++) {
      mapFiltersElements[j].removeAttribute('disabled', 'disabled');
    }

    title.addEventListener('invalid', window.valid.emptyFieldValidity);
    title.addEventListener('input', window.valid.titleValidity);
    price.addEventListener('invalid', window.valid.emptyFieldValidity);
    price.addEventListener('input', window.valid.minPriceInvalidity);
    price.addEventListener('input', window.valid.priceValidity);
    typeHouse.addEventListener('invalid', window.valid.minPriceInvalidity);
    typeHouse.addEventListener('change', window.valid.minPriceValidity);
    timeOut.addEventListener('change', window.valid.timeOutValidity);
    timeIn.addEventListener('change', window.valid.timeInValidity);
    roomNumberSelect.addEventListener('click', window.valid.numberRoomsValidity);
  };

  var disactivationPage = function () {
    mapBlock.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    setAddressPin(addressInput, pinMainXDisactive + ', ' + pinMainYDisactive);

    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', 'disabled');
    }
    for (var j = 0; j < mapFiltersElements.length; j++) {
      mapFiltersElements[j].setAttribute('disabled', 'disabled');
    }

    title.removeEventListener('invalid', window.valid.emptyFieldValidity);
    title.removeEventListener('input', window.valid.titleValidity);
    price.removeEventListener('invalid', window.valid.emptyFieldValidity);
    price.removeEventListener('input', window.valid.minPriceInvalidity);
    price.removeEventListener('input', window.valid.priceValidity);
    typeHouse.removeEventListener('invalid', window.valid.minPriceInvalidity);
    typeHouse.removeEventListener('change', window.valid.minPriceValidity);
    timeOut.removeEventListener('change', window.valid.timeOutValidity);
    timeIn.removeEventListener('change', window.valid.timeInValidity);
    roomNumberSelect.removeEventListener('click', window.valid.numberRoomsValidity);
  };

  pinMain.addEventListener('mousedown', function () {
    if (event.which === 1) {
      activationPage();
      if (mapPinsBlock.children.length < NUMBER_OF_OBJECTS) {
        window.pin.renderPins(window.data.adsArray);
      }
      window.valid.numberRoomsValidity();
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activationPage();
      if (mapPinsBlock.children.length < NUMBER_OF_OBJECTS) {
        window.pin.renderPins(window.data.adsArray);
      }
      window.valid.numberRoomsValidity();
    }
  });

  disactivationPage();
})();
