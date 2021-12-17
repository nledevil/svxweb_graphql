import { FileDataType, FileInputDataType } from '../types/GenericDataTypes';
import fileUtil from '../../data/file';
import b64 from '../utils/base64';

const fileMutations = {
  storeSvxlinkConfigFile: {
    type: FileDataType,
    name: 'storeSvxlinkConfigFile',
    args: {
      input: { type: FileInputDataType },
    },
    resolve: async (rootValue, { input }) => {
      try {
        const { file } = input;
        if (file) {
          fileUtil.storeSvxlinkConfigFile(b64.base64ToString(file));
          return input;
        }
        return { file: '' };
      } catch (err) {
        throw err;
      }
    }
  },
};

export default fileMutations;