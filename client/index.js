const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiY21jY2FydGh5MTUiLCJhIjoiY2o4YnFiN3RyMDBuNjJ3c2Y4dzhkMnIzNyJ9.ebxoBjxotfIr5-5EIsZ1hA';

const map = new mapboxgl.Map({
  container: 'map',
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', [-74.009, 40.705]);
marker.addTo(map);

const selectIds = ['hotels-choices', 'restaurants-choices', 'activities-choices'];
const buttonIds = ['hotels-add', 'restaurants-add', 'activities-add'];

fetch('/api/attractions')
.then(result => result.json())
.then(data => {
  console.log('data: ', data);
  for (var i = 0; i < data.length; i++){
    createAndAddOptions(selectIds[i], data[i]);
  }
})
.catch(console.error);

function createAndAddOptions(parentId, optionArr){
  const parent = document.getElementById(parentId);
  optionArr.forEach( option => {
    let newNode = document.createElement('OPTION');
    newNode.value = option.name;
    newNode.text = option.name;
    parent.appendChild(newNode);
  });
}


let buttons = buttonIds.map( id => document.getElementById(id));
console.log(buttons);


let hotelButton = buttons[0];
let restaurantButton = buttons[1];
let activityButton = buttons[2];

hotelButton.onclick = () => {
  var hotels = document.getElementById('hotels-choices');
  var selection = hotels.options[hotels.selectedIndex].value;
  console.log('hotel: ', selection);
};

restaurantButton.onclick = () => {
  var restaurants = document.getElementById('restaurants-choices');
  var selection = restaurants.options[restaurants.selectedIndex].value;
  console.log('restaurants: ', selection);
};

activityButton.onclick = () => {
  var activities = document.getElementById('activities-choices');
  var selection = activities.options[activities.selectedIndex].value;
  console.log('activities: ', selection);
};

// array of three arrays hotels, activities, and restaurants (in that order)
// select ids are hotels-choices, restaurants-choices, activities-choices
//  <option value="value1">Value 1</option>  --> options need value and the text


/*  Build models using the seed data
 *  Use seeded database to populate options
 *  Allow user to select and add options and add them to itinerary
 *     Zoom to that location on the map
 *  Be able to delete itinerary items
 * ... eventually save so they can access their itinerary
 */
