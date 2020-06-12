'use strict';

var NUMBER_OF_OBJECTS = 4;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

vbnvb

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('.map__pin');

//var userNumber = 1;
var title = document.querySelector('.map__title');
var titleText = title.textContent;

var getArrayObject = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var object = {
      author: {
        avatar: 'img/avatars/user03.png'
      },
      offer: {
        title: titleText,
        address: '{{location.x}}, {{location.y}}',
        price: 1000,
        type: OFFER_TYPE,
        rooms: 4,
        guests: 3,
        checkin: CHECKIN,
        checkout: CHECKIN,
        features: FEATURES,
        description: 'sss',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: '500px',
        y: '400px'
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
  pinElement.querySelector('button').style = 'left: ' + object.location.x + '; top: ' + object.location.y + ';';

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < getArrayObject(NUMBER_OF_OBJECTS).length; j++) {
  fragment.appendChild(renderPin(getArrayObject(NUMBER_OF_OBJECTS)[j]));
}
mapPinsBlock.appendChild(fragment);
