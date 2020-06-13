'use strict';

var NUMBER_OF_OBJECTS = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 62;
var PIN_HEIGHT = 80;
var MIN_Y = 130 - PIN_HEIGHT;
var MAX_Y = 630 - PIN_HEIGHT;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH * 2;

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');

var title = document.querySelector('.map__title');
var titleText = title.textContent;

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
        title: titleText,
        address: (location.x, location.y),
        price: 1000,
        type: randomType,
        rooms: '',
        guests: '',
        checkin: randomChekin,
        checkout: randomCheckout,
        features: FEATURES,
        description: '',
        photos: PHOTOS
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

var renderPin = function (object) {
  var pin = pinTemplate.cloneNode(true);
  pin.content.querySelector('img').src = object.author.avatar;
  pin.content.querySelector('img').alt = object.offer.title;
  var locationX = (object.location.x + PIN_WIDTH / 2);
  var locationY = (object.location.y + PIN_HEIGHT);
  pin.content.querySelector('button').style = 'left: ' + locationX + 'px; top: ' + locationY + 'px;';
  pin.content.querySelector('button').title = object.offer.title;
  return pin.content;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < getArrayObject(NUMBER_OF_OBJECTS).length; j++) {
  fragment.appendChild(renderPin(getArrayObject(NUMBER_OF_OBJECTS)[j]));
}
mapPinsBlock.appendChild(fragment);
