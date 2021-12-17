

import { GraphQLList as List, GraphQLString as StringType } from 'graphql';
import sql from '../../data/sql';
import sqltables from '../../config/sqltables';
import { SvxlinkDataType, SvxlinkDataInputType } from '../types/SvxlinkDataType.js';
import execFunction from '../../data/utils/exec';

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
  },
  getSvxlinkStatus: {
    type: StringType,
    args: {},
    resolve: async () => {
      try {
        const isActive = await execFunction("svxlink_status");
        return isActive ? isActive[0] : '';
      } catch (err) {
        throw err;
      }
    }
  }
};

export default svxlinkQueries;