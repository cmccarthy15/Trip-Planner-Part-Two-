const buildMarker = require('./marker.js');

var removeButton = document.createElement('BUTTON');
removeButton.classList.add('remove-btn');
removeButton.innerHTML = 'x';


function createItinerary(data, type, map) {
  let remNode = updateItineraryDOM(data, type);

  //Add marker
  let newMarker = addMarker(data, type, map);

  // event handler for remove button
  // resets the map's zoom, removes the marker and itinerary item
  remNode.onclick = function () {
      map.flyTo({
          center: [-74.009, 40.705],
          zoom: 12,
          speed: 1
      });
      newMarker.remove();
      this.parentElement.remove();
  };
}

function updateItineraryDOM(data, type){
  // construct all elements
  const parent = document.getElementById(type + '-list');
  let divNode = document.createElement('DIV');
  let pNode = document.createElement('SPAN');

  // give pNode the attraction's name and append to div
  pNode.innerHTML = data.name;
  divNode.appendChild(pNode);

  // clone our removeButton and append to div
  // append div to the parent / itinerary section
  let remNode = removeButton.cloneNode(true);
  divNode.appendChild(remNode);
  parent.appendChild(divNode);

  return remNode;
}

function addMarker(data, type, map){
  var newMarker = buildMarker(type, data.place.location);
  newMarker.addTo(map);
  map.flyTo({
      center: data.place.location,
      zoom: 15,
      curve: 1.8
  });
  return newMarker;
}

module.exports = createItinerary;
