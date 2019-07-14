/* eslint-disable global-require */
const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
// eslint-disable-next-line no-unused-expressions
require('passport-local').Strategy;
const User = require('./models/user');
const routes = require('./routes');
const db = require('./config/dbConnect');
const cloudinary = require('./config/cloudinaryConnect');

const app = express();
const PORT = process.env.PORT || 3001;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// handle server errors
// ==============================================================
const serverError = (err, msg) => {
  console.error(err.message);
  console.error(msg);
  process.exit(1);
};

const setupPassport = () => {
  // We need to use sessions to keep track of our user's login status
  app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());
  require('./config/passport');
};

// connects to data models
// ==============================================================
async function performConnections() {
  // connect to mongodb
  try {
    await db.connect();
  } catch (error) {
    serverError(error, 'Closing server');
  }

  // connect to cloudinary
  try {
    await cloudinary.connect();
  } catch (error) {
    serverError(error, 'Closing cloudinary connection.');
  }
}

const middleWare = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(DIST_DIR));
  app.use(morgan('dev')); // for logging
  setupPassport();
};

// Add routes, both API and view
const requireRoutes = () => app.use(routes);

const createServer = () => {
  middleWare();
  requireRoutes();
  performConnections();
  app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
  });
  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
};

createServer();
