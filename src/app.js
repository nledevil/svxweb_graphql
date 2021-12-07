import { networkInterfaces } from 'os';
import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import getOSStats from './data/os';
import schema from './graphql/schema';
import sql from './data/sql';
import sqltables from './config/sqltables';
import { readINIConfig, writeINIConfig } from './data/svxlink';

const { svxlinkTable } = sqltables;

const app = express();

app.use('*', cors());

app.use(
  '/getOSStats',
  async (_, res) => {
    getOSStats();
    res.status(200).json('OK');
  }
);

app.use(
  '/readINIConfig',
  async (_, res) => {
    const result = await readINIConfig();
    res.status(200).json(result);
  }
);

app.use(
  '/readDBConfig',
  async (_, res) => {
    const results = await sql.get(svxlinkTable);
    res.status(200).json(results);
  }
);

app.use(
  '/writeINIConfig',
  async (_, res) => {
    const results = await writeINIConfig();
    res.status(200).json(results);
  }
);

app.use(
  '/test',
  async (_, res) => {
    console.info(networkInterfaces());
    res.status(200).json(networkInterfaces());
  }
);

app.use(
  '/graphql',
  graphqlHTTP((request) => ({
    schema,
    graphiql: true,
    rootValue: request.body,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path,
    }),
  })),
);

app.listen( 4000 , () => {
  console.log('app is listening at port 4000')
})