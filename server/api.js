const express = require('express');
const router = express.Router();

const {db, Hotel, Place, Activity, Restaurant} = require("./models");

router.get('/attractions', (req, res, next) => {
  Promise.all([Hotel.findAll({include: [Place]}), Restaurant.findAll({include: [Place]}), Activity.findAll({include: [Place]})])
  .then( arr => res.status(200).json(arr))
  .catch(next);
});

router.get('/hotels/:id', (req, res, next) => {
    var pid = req.params.id;
    Hotel.findOne({
        where: {
            id: pid
        },
        include: [Place]
    })
  .then( hotel => {
    res.status(200).json(hotel);
  })
  .catch(next);
});

router.get('/activities/:id', (req, res, next) => {
    var pid = req.params.id;
    Activity.findOne({
        where: {
            id: pid
        },
        include: [Place]
    })
  .then( activity => {
    res.status(200).json(activity);
  })
  .catch(next);
});

router.get('/restaurants/:id', (req, res, next) => {
    var pid = req.params.id;
    Restaurant.findOne({
        where: {
            id: pid
        },
        include: [Place]
    })
  .then( restaurant => {
    res.status(200).json(restaurant);
  })
  .catch(next);
});

module.exports = router;
