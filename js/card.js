'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var MAP_CHILD_LENGTH = 3;
  var cardTemplate = document.querySelector('#card').content;
  var mapBlock = document.querySelector('.map');

  var renderCard = function (pin) {
    var card = cardTemplate.cloneNode(true);
    var featuresBlock = card.querySelector('.popup__features');
    var photosBlock = card.querySelector('.popup__photos');
    var photoElement = card.querySelector('.popup__photo');
    var featureElements = card.querySelectorAll('.popup__feature');

    while (featuresBlock.firstChild) {
      featuresBlock.removeChild(featuresBlock.firstChild);
    }

    while (photosBlock.firstChild) {
      photosBlock.removeChild(photosBlock.firstChild);
    }

    var getFeatures = function (data, elements) {
      var addElement = featuresBlock.appendChild(elements);
      for (var i = 0; i < pin.offer.features.length; i++) {
        switch (data) {
          case data[i]:
            return addElement;
          default:
            return 'error';
        }
      }
      return addElement;
    };

    for (var i = 0; i < pin.offer.features.length; i++) {
      getFeatures(FEATURES[i], featureElements[i]);
    }


    for (var j = 0; j < pin.offer.photos.length; j++) {
      var photo = photoElement.cloneNode(true);
      photosBlock.appendChild(photo);
      photo.src = pin.offer.photos[j];
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

  var setCard = function (args) {
    var cardElement = renderCard(args);
    if (mapBlock.children.length < MAP_CHILD_LENGTH) {
      mapBlock.appendChild(cardElement);
      var escCard = document.querySelector('button.popup__close');
      escCard.addEventListener('click', window.main.closeCard);
      document.addEventListener('keydown', closeCardEsc);
    }
  };

  var openCardEnter = function (evt) {
    if (evt.key === 'Enter') {
      setCard();
    }
  };

  var closeCardEsc = function (evt) {
    if (evt.key === 'Escape') {
      window.main.closeCard();
    }
  };

  window.card = {
    renderCard: renderCard,
    setCard: setCard,
    openCardEnter: openCardEnter,
    closeCardEsc: closeCardEsc
  };
})();
