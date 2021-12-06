import {
  GraphQLString as StringType,
} from 'graphql';
import sql from '../../data/sql';
import sqltables from '../../config/sqltables';
import { SvxlinkDataType, SvxlinkDataInputType } from '../types/SvxlinkDataType.js';
import { writeINIConfig } from '../../data/svxlink';

const { svxlinkTable } = sqltables;

const svxlinkMutations = {
  upsertSvxlinkItem: {
    type: SvxlinkDataType,
    name: 'upsertSvxlinkItem',
    args: {
      input: { type: SvxlinkDataInputType },
    },
    resolve: async (rootValue, { input }) => {
      try {
        const { headerName, settingName } = input;
        const rowExists = await sql.get(svxlinkTable, {
          headerName,
          settingName,
        });
        if (rowExists.length > 0) {
          const result = await sql.updateSvxlink(svxlinkTable, {
            input: { ...input },
          });
          return result;
        }
        const result = await sql.insert(svxlinkTable, {
          input: {
            ...input,
          },
        });
        return result;
      } catch (err) {
        throw err;
      }
    },
  },
  updateSvxlinkConfigFile: {
    type: StringType,
    name: 'updateSvxlinkConfigFile',
    args: {},
    resolve: async () => {
      try {
        const result = await writeINIConfig();
        return result;
      } catch (err) {
        throw err;
      }
    },
  },
};

export default svxlinkMutations;