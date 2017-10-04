const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');
const createItinerary = require('./itinerary.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiY21jY2FydGh5MTUiLCJhIjoiY2o4YnFiN3RyMDBuNjJ3c2Y4dzhkMnIzNyJ9.ebxoBjxotfIr5-5EIsZ1hA';

const map = new mapboxgl.Map({
  container: 'map',
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

// const marker = buildMarker('activities', [-74.009, 40.705]);
// marker.addTo(map);

// UNCOMMENT TO USE THE CREATE ITINERARY DEFINED IN THIS FILE
// var removeButton = document.createElement('BUTTON');
// removeButton.classList.add('remove-btn');
// removeButton.innerHTML = 'x';

fetch('/api/attractions')
.then(result => result.json())
.then(data => {
    const selectIds = ['hotels-choices', 'restaurants-choices', 'activities-choices'];
    for (var i = 0; i < data.length; i++){
        createAndAddOptions(selectIds[i], data[i]);
    }
})
.catch(console.error);

function createAndAddOptions(parentId, optionArr){
  const parent = document.getElementById(parentId);
  optionArr.forEach( option => {
    let newNode = document.createElement('OPTION');
    newNode.value = option.id;
    newNode.text = option.name;
    parent.appendChild(newNode);
  });
}

const optPanel = document.getElementById('options-panel');
optPanel.onclick = function(event) {
  let target = event.target;
  if (target.classList.contains('options-btn')){
    let type = target.id.slice(0, target.id.indexOf('-'));
    let selection = target.previousElementSibling.value;
    fetch('/api/' + type + '/' + selection)
        .then(result => {
            return result.json();
        }).then(data => {
            createItinerary(data, type, map);
        })
        .catch(console.error);
  }
};

// UNCOMMENT TO USE THE CREATE ITINERARY DEFINED IN THIS FILE
// AND TAKE OUT MAP FROM THE CALL ON LINE 52


// function createItinerary(data, type) {
//     let remNode = updateItineraryDOM(data, type);

//     //Add marker
//     let newMarker = addMarker(data, type);

//     // event handler for remove button
//     // resets the map's zoom, removes the marker and itinerary item
//     remNode.onclick = function () {
//         map.flyTo({
//             center: [-74.009, 40.705],
//             zoom: 12,
//             speed: 1
//         });
//         newMarker.remove();
//         this.parentElement.remove();
//     };
// }

// function updateItineraryDOM(data, type){
//     // construct all elements
//     const parent = document.getElementById(type + '-list');
//     let divNode = document.createElement('DIV');
//     let pNode = document.createElement('SPAN');

//     // give pNode the attraction's name and append to div
//     pNode.innerHTML = data.name;
//     divNode.appendChild(pNode);

//     // clone our removeButton and append to div
//     // append div to the parent / itinerary section
//     let remNode = removeButton.cloneNode(true);
//     divNode.appendChild(remNode);
//     parent.appendChild(divNode);

//     return remNode;
// }

// function addMarker(data, type){
//     var newMarker = buildMarker(type, data.place.location);
//     newMarker.addTo(map);
//     map.flyTo({
//         center: data.place.location,
//         zoom: 15,
//         curve: 1.8
//     });
//     return newMarker;
// }
