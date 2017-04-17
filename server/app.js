const express = require('express');
const path = require('path');
const passport = require('passport');
const passConfig = require('./passportConfig.js')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dbConfig = require('../database/db/knex.js');
const pgStore = require('connect-pg-simple')(session);
const authorize = require('./routes/auth.js');
const bodyParser = require('body-parser');
const router = require('./router.js');

const app = express();

//passes in passport instance and sets up configuration
passConfig(passport)

app.use(cookieParser()); //read cookies needed for auth
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Sets up /client as static directory
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../client'));

//session config options
const options = {
  secret: 'rootio',
  resave: true,
  saveUninitialized: false,
  store: new pgStore({
    conString: dbConfig.config.connection
  })
}

app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());

//imported routes
authorize(app, passport);

//comment back in when routes are set up
app.use('/api', router)

// deployment port variable - default to 3000
//run psql mydatabase < node_modules/connect-pg-simple/table.sql
//in order to add a sessions table
var port = process.env.PORT || 3000
var server = app.listen(port, function(){
	console.log(`Magical unicorns will arrive on port ${port}!`);
  console.log('Database connected -', dbConfig.config.connection)
});
var io = require('./socket.js').init(server);
