

import { GraphQLList as List } from 'graphql';
import sql from '../../data/sql';
import sqltables from '../../config/sqltables';
import { SvxlinkDataType, SvxlinkDataInputType } from '../types/SvxlinkDataType.js';

const { svxlinkTable } = sqltables;

const svxlinkQueries = {
  getSvxlinkConfig: {
    type: new List(SvxlinkDataType),
    args: {
      input: { type: SvxlinkDataInputType },
    },
    resolve: async (rootValue, { input }) => {
      try {
        const results = sql.get(svxlinkTable, input);
        return results;
      } catch (err) {
        throw err;
      }
    } 
  }
};

export default svxlinkQueries;