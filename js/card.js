'use strict';

(function () {
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAP_CHILD_LENGTH = 3;
  var cardTemplate = document.querySelector('#card').content;
  var mapBlock = document.querySelector('.map');

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

    for (var i = 0; i < pin.offer.features.length; i++) {
      var element = pin.offer.features[i].cloneNode(true);
      featuresBlock.appendChild(element);
    }

    for (var j = 0; j < pin.offer.photos.length; j++) {
      var photo = pin.offer.photos[0].cloneNode(true);
      photosBlock.appendChild(photo);
      card.querySelectorAll('.popup__photo')[j].src = PHOTOS[j];
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
      escCard.addEventListener('click', closeCard);
      document.addEventListener('keydown', closeCardEsc);
    }
  };

  var openCardEnter = function (evt) {
    if (evt.key === 'Enter') {
      setCard();
    }
  };

  var closeCard = function () {
    var popupCard = document.querySelector('article.map__card.popup');
    mapBlock.removeChild(popupCard);
  };

  var closeCardEsc = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  window.card = {
    renderCard: renderCard,
    setCard: setCard,
    openCardEnter: openCardEnter,
    closeCard: closeCard,
    // closeCardEsc: closeCardEsc
  };
})();
