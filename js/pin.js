'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin');

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
    pinButton.addEventListener('click', window.main.closeCard);
    pinButton.addEventListener('click', function () {
      window.card.setCard(object);
    });
    pinButton.addEventListener('keydown', function () {
      window.card.openCardEnter(object);
    });

    return pin.content;
  };

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(renderPin(array[j]));
    }
    mapPinsBlock.appendChild(fragment);
  };


  window.pin = {
    renderPins: renderPins,
  };

})();
