import { FileDataType } from '../types/GenericDataTypes';
import file from '../../data/file';

import b64 from '../utils/base64';

const fileQueries = {
  getSvxlinkLogFile: {
    type: FileDataType,
    args: {},
    resolve: async () => {
      try {
        const fileStr = file.getSvxlinkLogFile();
        return {
          file: b64.stringToBase64(fileStr),
        };
      } catch (err) {
        throw err;
      }
    } 
  },
  getSvxlinkConfigFile: {
    type: FileDataType,
    args: {},
    resolve: async () => {
      try {
        const fileStr = file.getSvxlinkConfigFile();
        return {
          file: b64.stringToBase64(fileStr),
        };
      } catch (err) {
        throw err;
      }
    } 
  },
};

export default fileQueries;