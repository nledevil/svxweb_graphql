import knex from 'knex';

// require('dotenv').config();

const knx = knex({
  client: 'sqlite3',
  connection: {
    filename: `${process.cwd()}/src/data/db/svxweb.db`,
  }
});

module.exports = knx;
