import knex from 'knex';

require('dotenv').config();

const { SVXLINK_CONFIG_LOCATION } = process.env;

const knx = knex({
  client: 'sqlite3',
  connection: {
    filename: SVXLINK_CONFIG_LOCATION,
  }
});

module.exports = knx;
