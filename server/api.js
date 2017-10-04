const express = require('express');
const router = express.Router();

const {db, Hotel, Place, Activity, Restaurant} = require("./models");


router.get('/attractions', (req, res, next) => {
  Promise.all([Hotel.findAll({include: [Place]}), Restaurant.findAll({include: [Place]}), Activity.findAll({include: [Place]})])
  .then( arr => res.status(200).json(arr))
  .catch(next);
});

router.get('/hotels', (req, res, next) => {
  Hotel.findAll()
  .then( hotels => {
    res.status(200).json(hotels);
  })
  .catch(next);
});

router.get('/activities', (req, res, next) => {
  Activity.findAll()
  .then( activities => {
    res.status(200).json(activities);
  })
  .catch(next);
});

router.get('/restaurants', (req, res, next) => {
  Restaurant.findAll()
  .then( restaurants => {
    res.status(200).json(restaurants);
  })
  .catch(next);
});

module.exports = router;
