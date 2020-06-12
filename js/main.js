'use strict';


var NUMBER_OF_OBJECTS = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('.map__pin');

var userNumber = 1;
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
  for (var i = 0; i < quantity; i++) {
    var randomX = getRandomData(0, 1200);
    var randomY = getRandomData(130, 630);
    var randomType = getRandElement(OFFER_TYPE);
    var randomChekin = getRandElement(CHECKIN);
    var randomCheckout = getRandElement(CHECKOUT);

    var object = {
      author: {
        avatar: 'img/avatars/user0' + (userNumber + i) + '.png'
      },
      offer: {
        title: titleText,
        address: location.x, location.y,
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
        x: randomX + 'px',
        y: randomY + 'px'
      }
    };

    ads.push(object);
  }
  return ads;
};


var renderPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.innerHTML = '<img width="40" height="40" draggable="false" alt="Метка объявления">';
  pinElement.querySelector('img').src = object.author.avatar;
  pinElement.querySelector('img').alt = object.offer.title;
  pinElement.style = 'left: ' + object.location.x + '; top: ' + object.location.y + ';';
  pinElement.title = object.offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < getArrayObject(NUMBER_OF_OBJECTS).length; j++) {
  fragment.appendChild(renderPin(getArrayObject(NUMBER_OF_OBJECTS)[j]));
}
mapPinsBlock.appendChild(fragment);
