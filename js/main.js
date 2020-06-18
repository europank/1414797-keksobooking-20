/* eslint-disable radix */
'use strict';

var NUMBER_OF_OBJECTS = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGHT = 84;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH / 2;
var adsArray = [];

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
var oneRoom = document.querySelectorAll('#room_number option')[0];
var twoRoom = document.querySelectorAll('#room_number option')[1];
var threeRoom = document.querySelectorAll('#room_number option')[2];
var hundredRoom = document.querySelectorAll('#room_number option')[3];
var guestNumberSelect = document.querySelector('#capacity');
var notForGuest = document.querySelectorAll('#capacity option')[3];
var forOneGuest = document.querySelectorAll('#capacity option')[2];
var forTwoGuest = document.querySelectorAll('#capacity option')[1];
var forThreeGuest = document.querySelectorAll('#capacity option')[0];


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

var pinMainXActive = parseInt(pinMain.style.left) - PIN_MAIN_WIDTH / 2;
var pinMainYActive = parseInt(pinMain.style.top) - PIN_MAIN_HEIGHT;
var pinMainXDisactive = parseInt(pinMain.style.left);
var pinMainYDisactive = parseInt(pinMain.style.top);

var activationPage = function () {
  mapBlock.classList.remove('map--faded');
  renderPins(adsArray);

  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled', 'disabled');
  }
  for (var j = 0; j < mapFiltersElements.length; j++) {
    mapFiltersElements[j].removeAttribute('disabled', 'disabled');
  }
  setAddressPin(addressInput, pinMainXActive + ', ' + pinMainYActive);

  roomNumberSelect.addEventListener('change', onSelectOneRoom);
  roomNumberSelect.addEventListener('change', onSelectTwoRoom);
  roomNumberSelect.addEventListener('change', onSelectThreeRoom);
  roomNumberSelect.addEventListener('change', onSelectHundredRoom);
};

var disactivationPage = function () {
  mapBlock.classList.add('map--faded');
  addressInput.setAttribute('disabled', 'disabled');

  form.classList.add('ad-form--disabled');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', 'disabled');
  }
  for (var j = 0; j < mapFiltersElements.length; j++) {
    mapFiltersElements[j].setAttribute('disabled', 'disabled');
  }
  setAddressPin(addressInput, pinMainXDisactive + ', ' + pinMainYDisactive);

  roomNumberSelect.removeEventListener('change', onSelectOneRoom);
  roomNumberSelect.removeEventListener('change', onSelectTwoRoom);
  roomNumberSelect.removeEventListener('change', onSelectThreeRoom);
  roomNumberSelect.removeEventListener('change', onSelectHundredRoom);
};

pinMain.addEventListener('mousedown', function () {
  activationPage();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activationPage();
  }
});

var onSelectOneRoom = function () {
  if (oneRoom.selected === true) {
    forOneGuest.removeAttribute('disabled', 'disabled');
    forOneGuest.selected = true;
    forTwoGuest.setAttribute('disabled', 'disabled');
    forThreeGuest.setAttribute('disabled', 'disabled');
    notForGuest.setAttribute('disabled', 'disabled');
  }
};

var onSelectTwoRoom = function () {
  if (twoRoom.selected === true) {
    forOneGuest.removeAttribute('disabled', 'disabled');
    forTwoGuest.removeAttribute('disabled', 'disabled');
    forTwoGuest.selected = true;
    forThreeGuest.setAttribute('disabled', 'disabled');
    notForGuest.setAttribute('disabled', 'disabled');
  }
};

var onSelectThreeRoom = function () {
  if (threeRoom.selected === true) {
    forOneGuest.removeAttribute('disabled', 'disabled');
    forTwoGuest.removeAttribute('disabled', 'disabled');
    forThreeGuest.removeAttribute('disabled', 'disabled');
    forThreeGuest.selected = true;
    notForGuest.setAttribute('disabled', 'disabled');
  }
};

var onSelectHundredRoom = function () {
  if (hundredRoom.selected === true) {
    notForGuest.removeAttribute('disabled', 'disabled');
    notForGuest.selected = true;
    forTwoGuest.setAttribute('disabled', 'disabled');
    forThreeGuest.setAttribute('disabled', 'disabled');
    forOneGuest.setAttribute('disabled', 'disabled');
  }
};

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
