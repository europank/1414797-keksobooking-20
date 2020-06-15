'use strict';

var NUMBER_OF_OBJECTS = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var HOUSE_TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 62;
var PIN_HEIGHT = 80;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH / 2;
var NUMBER_OF_POPUP = 1;

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');
var cardTemplate = document.querySelector('#card');
var photoElement = cardTemplate.content.querySelector('.popup__photo');

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
        title: 'Уютное гнездышко для молодоженов',
        address: '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
        price: 1000,
        type: randomType,
        rooms: 2,
        guests: 3,
        checkin: randomChekin,
        checkout: randomCheckout,
        features: FEATURES,
        description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
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

var fragment = document.createDocumentFragment();
for (var j = 0; j < getArrayObject(NUMBER_OF_OBJECTS).length; j++) {
  fragment.appendChild(renderPin(getArrayObject(NUMBER_OF_OBJECTS)[j]));
}
mapPinsBlock.appendChild(fragment);

var renderCard = function (object) {
  var card = cardTemplate.cloneNode(true);

  for (var l = 1; l < PHOTOS.length; l++) {
    var photo = photoElement.cloneNode(true);
    card.content.querySelector('.popup__photos').appendChild(photo);
    photo.src = object.offer.photos[l];
  }

  var houseType = '';
  for (var n = 0; n < OFFER_TYPE.length; n++) {
    if (object.offer.type === OFFER_TYPE[n]) {
      houseType = HOUSE_TYPE[n];
    }
  }

  card.content.querySelector('.popup__title').textContent = object.offer.title;
  card.content.querySelector('.popup__text--address').textContent = object.offer.address;
  card.content.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
  card.content.querySelector('.popup__type').textContent = houseType;
  card.content.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  card.content.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  card.content.querySelector('.popup__features').textContent = object.offer.features;
  card.content.querySelector('.popup__description').textContent = object.offer.description;
  card.content.querySelector('.popup__avatar').src = object.author.avatar;
  card.content.querySelector('.popup__photo').src = object.offer.photos[0];

  return card.content;
};

var fragmentCard = document.createDocumentFragment();
for (var k = 0; k < NUMBER_OF_POPUP; k++) {
  fragmentCard.appendChild(renderCard(getArrayObject(NUMBER_OF_OBJECTS)[k]));
}
mapBlock.appendChild(fragmentCard);

