const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require("./models").db;

const apiRouter = require('./api.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '..', 'public')));

/* could also do...
... or path.resolve
 * app.get('/', (req, res, next) =>{
 *  res.sendFile(path.join(__dirname, '../public/index.html'_));
 * })
 * BUT you'll need the static middleware in order to let index html
 * have access to the files it depends on like bundle.js and style.css
 */

app.use('/api', apiRouter);

app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use( (err, req, res, next) => {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send('Something went wrong: ' + err.message);
});


const port = 3000;

app.listen(port, function() {
  console.log('The server is listening closely on port', port);
  db.sync()
    .then(function() {
      console.log('Synchronated the database');
    })
    .catch(function(err) {
      console.error('Trouble right here in River City', err, err.stack);
    });
});

