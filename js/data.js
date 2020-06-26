'use strict';

(function () {
  var TYPE_MAP = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_Y = 130;
  var MAX_Y = 630;
  var PIN_WIDTH = 50;
  var MIN_X = PIN_WIDTH / 2;
  var MAX_X = 1200 - PIN_WIDTH / 2;
  var NUMBER_OF_OBJECTS = 8;
  var cardTemplate = document.querySelector('#card').content;
  var photosElements = cardTemplate.querySelectorAll('.popup__photo');
  var photosElementsArray = Array.prototype.slice.call(photosElements);
  var featuresElements = cardTemplate.querySelectorAll('.popup__feature');
  var featuresElementsArray = Array.prototype.slice.call(featuresElements);


  var getRandomData = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandElement = function (array) {
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
  };

  var getRandomArray = function (sourceArr, arrLength) {
    if (sourceArr.length < arrLength) {
      arrLength = sourceArr.length;
    }
    var resultArr = [];
    while (resultArr.length < arrLength) {
      var randomIndex = getRandomData(0, sourceArr.length);
      var value = sourceArr[randomIndex];
      if (resultArr.indexOf(value) === -1) {
        resultArr.push(value);
      }
    }
    return resultArr;
  };

  var getArrayObject = function (quantity) {
    var ads = [];

    for (var i = 1; i <= quantity; i++) {
      var randomX = getRandomData(MIN_X, MAX_X);
      var randomY = getRandomData(MIN_Y, MAX_Y);
      var randomType = getRandElement(OFFER_TYPE);
      var randomChekin = getRandElement(CHECKIN);
      var randomCheckout = getRandElement(CHECKOUT);
      var featureLength = getRandomData(1, FEATURES.length + 1);
      var featureNewArr = getRandomArray(featuresElementsArray, featureLength);
      var photoLength = getRandomData(1, PHOTOS.length + 1);
      photosElementsArray.length = photoLength;

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
          features: featureNewArr,
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

  var adsArray = getArrayObject(NUMBER_OF_OBJECTS);

  window.data = {
    adsArray: adsArray
  };
})();
