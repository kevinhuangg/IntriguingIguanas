var pg = require('pg');
var knex = require('./db/knex.js').config;

var client = new pg.Client(knex.connection);

client.connect();

module.exports = client;