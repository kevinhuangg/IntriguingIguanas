const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dbConfig = require('../database/db/knex.js');
const pgStore = require('connect-pg-simple')(session);
const auth = require('./routes/auth.js');
const router = require('./routes.js');

const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser()); //read cookies needed for auth
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}))

// Sets up /client as static directory
app.use(express.static(__dirname + '/../client/dist'));

//session config options
const options = {
  secret: 'rootio',
  resave: true,
  saveUninitialized: false,
  cookie: {},
  store: new pgStore({
  	conString: dbConfig.config.connection
  })	
}

//authenticate user before they can access routes other than homepage
app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth)

// deployment port variable - default to 3000
var port = process.env.PORT || 3000
app.listen(port, function(){
	console.log(`Magical Unicorns will arrive on port ${port}!`);
});