'use strict';
var NUMBER_OF_OBJECTS = 8;

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var getArrayObjects = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {

    var object = {
      author:{
        avatar: 'img/avatars/user01.png'
      },
      offer:{
        title: ,
        address: "{{location.x}}, {{location.y}}",
        price: ,
        type: palace, flat, house или bungalo,
        rooms: ,
        guests: ,
        checkin: 12:00, 13:00 или 14:00,
        checkout: 12:00, 13:00 или 14:00,
        features: ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
        description: ,
        photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
      },
      location:{
        x: ,
        y: от 130 до 630
      }
    }

    ads.push(object);
  }
  return ads;
}

getArrayObjects(NUMBER_OF_OBJECTS)
