'use strict';

var NUMBER_OF_OBJECTS = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var MIN_PRICE_MAP = {
  'palace': 10000,
  'flat': 5000,
  'house': 1000,
  'bungalo': 0
};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGHT = 62;
var PIN_MAIN_HEIGHT_ACTIVE = 84;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH / 2;
var adsArray = [];
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var MAX_PRICE = 1000000;

var mapPinsBlock = document.querySelector('.map__pins');
var pinMain = document.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin');
var cardTemplate = document.querySelector('#card').content;
var photosElements = cardTemplate.querySelectorAll('.popup__photo');
var photosElementsArray = Array.prototype.slice.call(photosElements);
var featuresElements = cardTemplate.querySelectorAll('.popup__feature');
var featuresElementsArray = Array.prototype.slice.call(featuresElements);
var addressInput = document.querySelector('#address');
var roomNumberSelect = document.querySelector('#room_number');
var roomNumberArray = document.querySelectorAll('#room_number option');
var guestNumberArray = document.querySelectorAll('#capacity option');
var title = document.querySelector('#title');
var price = document.querySelector('#price');

var mapBlock = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var formElements = document.querySelectorAll('.ad-form fieldset');
var mapFiltersElements = document.querySelector('.map__filters').children;


var getRandomData = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function getRandElement(array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

var getArrayObject = function (quantity) {
  var ads = [];
  FEATURES.length = getRandomData(1, FEATURES.length + 1);
  PHOTOS.length = getRandomData(1, PHOTOS.length + 1);

  for (var i = 1; i <= quantity; i++) {
    var randomX = getRandomData(MIN_X, MAX_X);
    var randomY = getRandomData(MIN_Y, MAX_Y);
    var randomType = getRandElement(OFFER_TYPE);
    var randomChekin = getRandElement(CHECKIN);
    var randomCheckout = getRandElement(CHECKOUT);

    var object = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Уютное гнездышко для молодоженов',
        address: randomX + ', ' + randomY,
        price: 1000,
        type: TYPE_MAP[randomType],
        rooms: 2,
        guests: 3,
        checkin: randomChekin,
        checkout: randomCheckout,
        features: featuresElementsArray,
        description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        photos: photosElementsArray
      },
      location: {
        x: randomX,
        y: randomY
      }
    };

    ads.push(object);
  }
  return ads;
};

adsArray = getArrayObject(NUMBER_OF_OBJECTS);

var renderPin = function (object) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.content.querySelector('img');
  var pinButton = pin.content.querySelector('button');
  var locationX = (object.location.x - PIN_WIDTH / 2);
  var locationY = (object.location.y - PIN_HEIGHT);
  pinImage.src = object.author.avatar;
  pinImage.alt = object.offer.title;
  pinButton.style.left = locationX + 'px';
  pinButton.style.top = locationY + 'px';
  pinButton.title = object.offer.title;
  return pin.content;
};

var renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderPin(array[j]));
  }
  mapPinsBlock.appendChild(fragment);
};

var setAddressPin = function (element, value) {
  element.setAttribute('placeholder', value);
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
  title.addEventListener('invalid', validityEmptyField);
  title.addEventListener('input', titleValidity);
  price.addEventListener('invalid', validityEmptyField);
  price.addEventListener('input', priceValidity);
  roomNumberSelect.addEventListener('click', numberRoomsValidity);
};

var disactivationPage = function () {
  mapBlock.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  addressInput.setAttribute('disabled', 'disabled');
  setAddressPin(addressInput, pinMainXDisactive + ', ' + pinMainYDisactive);

  for (var i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', 'disabled');
  }
  for (var j = 0; j < mapFiltersElements.length; j++) {
    mapFiltersElements[j].setAttribute('disabled', 'disabled');
  }

  title.removeEventListener('invalid', validityEmptyField);
  title.removeEventListener('input', titleValidity);
  price.removeEventListener('invalid', validityEmptyField);
  price.removeEventListener('input', priceValidity);
  roomNumberSelect.removeEventListener('click', numberRoomsValidity);
};

pinMain.addEventListener('mousedown', function () {
  activationPage();
  if (mapPinsBlock.children.length < NUMBER_OF_OBJECTS) {
    renderPins(adsArray);
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activationPage();
  }
});

var numberRoomsValidity = function () {
  for (var i = 0; i < roomNumberArray.length; i++) {
    var rooms = roomNumberArray[i];
    if (rooms.selected === true) {
      for (var j = 0; j < guestNumberArray.length; j++) {
        var guests = guestNumberArray[j];
        if (rooms.value < guests.value || guests.value === '0') {
          guests.setAttribute('disabled', 'disabled');
        } else if (rooms.value === '100') {
          if (guests.value === '0') {
            guests.removeAttribute('disabled', 'disabled');
          } else {
            guests.setAttribute('disabled', 'disabled');
          }
        } else {
          guests.removeAttribute('disabled', 'disabled');
        }
      }
    }
  }
};

var validityEmptyField = function () {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
};

var titleValidity = function () {
  var valueLength = title.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Осталось ввести ' + (MIN_TITLE_LENGTH - valueLength) + ' символов');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Вы превысили максимальную длину заголовка на ' + (valueLength - MAX_TITLE_LENGTH) + ' символов');
  } else {
    title.setCustomValidity('');
  }
};

var priceValidity = function () {
  var priceValue = Number(price.value);
  if (priceValue > MAX_PRICE) {
    price.setCustomValidity('Вы превысили максимально допустимое значение на ' + (priceValue - MAX_PRICE));
  } else {
    title.setCustomValidity('');
  }
};


/*var numberRoomsValidity = function () {
  for (var i = 0; i < roomNumberArray.length; i++) {
    var rooms = roomNumberArray[i];
    if (rooms.selected === true) {
      for (var j = 0; j < guestNumberArray.length; j++) {
        var guests = guestNumberArray[j];
        if (rooms.value < guests.value) {
          guests.setAttribute('disabled', 'disabled');
        } else if (guests.value === '0') {
          guests.setAttribute('disabled', 'disabled');
        } else {
          guests.removeAttribute('disabled', 'disabled');
        }
      }
    }
  }
};*/
disactivationPage();

/*var newPin = adsArray[0];


var renderCard = function (pin) {
  var card = cardTemplate.cloneNode(true);
  var featuresBlock = card.querySelector('.popup__features');
  var photosBlock = card.querySelector('.popup__photos');

  while (featuresBlock.firstChild) {
    featuresBlock.removeChild(featuresBlock.firstChild);
  }

  while (photosBlock.firstChild) {
    photosBlock.removeChild(photosBlock.firstChild);
  }

  for (var i = 0; i < FEATURES.length; i++) {
    var element = pin.offer.features[i].cloneNode(true);
    featuresBlock.appendChild(element);
  }

  for (var l = 0; l < PHOTOS.length; l++) {
    var photo = pin.offer.photos[0].cloneNode(true);
    photosBlock.appendChild(photo);
    card.querySelectorAll('.popup__photo')[l].src = PHOTOS[l];
  }

  card.querySelector('.popup__title').textContent = pin.offer.title;
  card.querySelector('.popup__text--address').textContent = pin.offer.address;
  card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = pin.offer.type;
  card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  card.querySelector('.popup__description').textContent = pin.offer.description;
  card.querySelector('.popup__avatar').src = pin.author.avatar;

  return card;
};

mapBlock.appendChild(renderCard(newPin));*/
