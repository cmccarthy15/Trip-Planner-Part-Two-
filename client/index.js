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


/*  Build models using the seed data
 *  Use seeded database to populate options
 *  Allow user to select and add options and add them to itinerary
 *     Zoom to that location on the map
 *  Be able to delete itinerary items
 * ... eventually save so they can access their itinerary
 */
