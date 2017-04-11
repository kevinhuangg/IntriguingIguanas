const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth.js');


const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Sets up /client as static directory
app.use(express.static(__dirname + '/../client/dist'));

//Authentication	


// deployment port variable - default to 3000
var port = process.env.PORT || 3000
app.listen(port, function(){
	console.log(`Magical Unicorns will arrive on port ${port}!`);
});