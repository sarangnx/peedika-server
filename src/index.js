/**
 * APP
 * This file serves as the entry point to the application.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

// set socketio to response object
app.use((req, res, next) => {
    res.io = io;
    next();
});

// Initialize Environment variables.
require('dotenv').config({ path: path.join(__dirname, '..','.env') });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Enable Cross Origin Requests
 * Essential since Backend and Front end are
 * seperated. Both servers run on different 
 * ports, making the api requests cors.
 */
app.use(cors());

/**
 * Register Passport middleware for authentication
 */
app.use(passport.initialize());

/**
 * Serving static files.
 * all requests to /images/ looks up in the images directory
 */
app.use('/images', express.static(path.join(__dirname, '..', 'images')));


/***
 *  ============= Import Routes =============
 */
const auth = require('./routes/auth');
const store = require('./routes/store');
const inventory = require('./routes/inventory');
const order = require('./routes/order');
const cart = require('./routes/cart');
const stocks = require('./routes/stocks');
const users = require('./routes/users');
const notifications = require('./routes/notifications');
const offers = require('./routes/offers');
const banners = require('./routes/banners');

/***
 *  ============ Register Routes ============
 */
app.use('/api/auth', auth);
app.use('/api/store', store);
app.use('/api/inventory', inventory);
app.use('/api/orders', order);
app.use('/api/cart', cart);
app.use('/api/stocks', stocks);
app.use('/api/users', users);
app.use('/api/notifications', notifications);
app.use('/api/offers', offers);
app.use('/api/banners', banners);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.message = 'Requested URL Not Found';
    next(err);
});
  
// error handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({
        status:'failed',
        message: err.message || 'An error occured',
    });
});

module.exports.app = app;
module.exports.server = server;
